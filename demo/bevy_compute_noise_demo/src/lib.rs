use bevy::{asset::embedded_asset, prelude::*, render::{mesh::VertexAttributeValues, render_resource::{AsBindGroup, ShaderRef}, texture::{ImageAddressMode, ImageSampler, ImageSamplerDescriptor}}, sprite::{Material2d, Material2dPlugin, MaterialMesh2dBundle, Mesh2dHandle}, window::WindowResized};
use bevy_compute_noise::prelude::*;
use bevy_inspector_egui::*;
use bevy_inspector_egui::quick::ResourceInspectorPlugin;
use inspector_options::ReflectInspectorOptions;
use wasm_bindgen::prelude::*;

#[derive(Reflect, Resource, Default, InspectorOptions)]
#[reflect(Resource, InspectorOptions)]
struct NoiseSettings {
    noise: NoiseType,
}

#[derive(Reflect)]
enum NoiseType {
    Perlin2D(Perlin2d),
    Worley2D(Worley2d),
    Worley3D(Worley3d),
}

impl Default for NoiseType {
    fn default() -> Self {
        NoiseType::Perlin2D(Perlin2d::default())
    }
}

#[wasm_bindgen]
pub fn demo(canvas_id: String) {
    App::new()
        .add_plugins(DefaultPlugins.set(WindowPlugin {
            primary_window: Some(Window {
                canvas: Some(canvas_id),
                resizable: true,
                ..default()
            }),
            ..default()
        }))
        .register_type::<NoiseSettings>()
        .add_plugins((
            ResourceInspectorPlugin::<NoiseSettings>::default(),
            NoiseMaterialPlugin,
            ComputeNoisePlugin::<Perlin2d>::default(),
            ComputeNoisePlugin::<Worley2d>::default(),
            ComputeNoisePlugin::<Worley3d>::default(),
        ))
        .add_systems(Startup, setup)
        .add_systems(Update, (regenerate_noise, on_resize))
        .run();
}

fn setup(
    mut commands: Commands,
    mut images: ResMut<Assets<Image>>,
    mut meshes: ResMut<Assets<Mesh>>,
    mut materials_2d: ResMut<Assets<NoiseMaterial>>,
    mut materials_3d: ResMut<Assets<Noise3dMaterial>>,
) {
    let mut image_2d = ComputeNoiseImage::create_image(ComputeNoiseSize::D2(512, 512));
    image_2d.sampler = ImageSampler::Descriptor(ImageSamplerDescriptor {
        address_mode_u: ImageAddressMode::Repeat,
        address_mode_v: ImageAddressMode::Repeat,
        ..default()
    });
    let handle_2d = images.add(image_2d);

    let image_3d_size = ComputeNoiseSize::D3(128, 128, 128);
    let mut image_3d = ComputeNoiseImage::create_image(image_3d_size);
    image_3d.sampler = ImageSampler::Descriptor(ImageSamplerDescriptor {
        address_mode_u: ImageAddressMode::Repeat,
        address_mode_v: ImageAddressMode::Repeat,
        ..default()
    });
    let handle_3d = images.add(image_3d);

    commands.init_resource::<NoiseSettings>();

    let mut quad = Rectangle::default().mesh();
    if let Some(uvs) = quad.attribute_mut(Mesh::ATTRIBUTE_UV_0) {
        if let VertexAttributeValues::Float32x2(uvs) = uvs {
            for uv in uvs.iter_mut() {
                *uv = [uv[0] * 2.0, uv[1] * 2.0];
            }
        }
    }

    commands.spawn((
        MaterialMesh2dBundle {
            mesh: meshes.add(quad.clone()).into(),
            transform: Transform::default().with_scale(Vec3::splat(512.)),
            material: materials_2d.add(NoiseMaterial {
                image: handle_2d.clone()
            }),
            ..default()
        },
    ));

    commands.spawn((
        MaterialMesh2dBundle {
            mesh: meshes.add(quad).into(),
            transform: Transform::default().with_scale(Vec3::splat(512.)),
            material: materials_3d.add(Noise3dMaterial {
                image: handle_3d.clone(),
                layer: 0,
                texture_size: UVec3::new(image_3d_size.width(), image_3d_size.height(), image_3d_size.depth()),
            }),
            ..default()
        },
    ));

    commands.insert_resource(NoiseImages {
        image_2d: handle_2d,
        image_3d: handle_3d,
    });

    commands.spawn(Camera2dBundle::default());
}

#[derive(Resource)]
struct NoiseImages {
    image_2d: Handle<Image>,
    image_3d: Handle<Image>,
}

#[derive(Asset, AsBindGroup, Debug, Clone, Reflect)]
struct NoiseMaterial {
    #[texture(101)]
    #[sampler(102)]
    image: Handle<Image>,
}

impl Material2d for NoiseMaterial {
    fn fragment_shader() -> ShaderRef {
        "embedded://bevy_compute_noise_demo/shaders/noise_2d_material.wgsl".into()
    }
}

#[derive(Asset, AsBindGroup, Debug, Clone, Reflect)]
struct Noise3dMaterial {
    #[texture(101, dimension = "3d")]
    #[sampler(102)]
    image: Handle<Image>,
    #[uniform(103)]
    layer: u32,
    #[uniform(104)]
    texture_size: UVec3,
}

impl Material2d for Noise3dMaterial {
    fn fragment_shader() -> ShaderRef {
        "embedded://bevy_compute_noise_demo/shaders/noise_3d_material.wgsl".into()
    }
}

struct NoiseMaterialPlugin;

impl Plugin for NoiseMaterialPlugin {
    fn build(&self, app: &mut App) {
        embedded_asset!(app, "shaders/noise_2d_material.wgsl");
        embedded_asset!(app, "shaders/noise_3d_material.wgsl");

        app.add_plugins((
            Material2dPlugin::<NoiseMaterial>::default(),
            Material2dPlugin::<Noise3dMaterial>::default()
        ));
    }
}

fn on_resize(
    mut query: Query<&mut Transform, With<Mesh2dHandle>>,
    mut resize_reader: EventReader<WindowResized>,
) {
    for e in resize_reader.read() {
        for mut transform in query.iter_mut() {
            transform.scale = Vec3::splat(f32::min(e.width as f32 / 2.0, e.height as f32 - 24.0));
        }
    }
}

fn regenerate_noise(
    mut images: ResMut<Assets<Image>>,
    noise_settings: Res<NoiseSettings>,
    noise_images: Res<NoiseImages>,
    mut query_2d: Query<&mut Visibility, (With<Handle<NoiseMaterial>>, Without<Handle<Noise3dMaterial>>)>,
    mut query_3d: Query<&mut Visibility, (With<Handle<Noise3dMaterial>>, Without<Handle<NoiseMaterial>>)>,
    mut perlin_2d_queue: ResMut<ComputeNoiseQueue<Perlin2d>>,
    mut worley_2d_queue: ResMut<ComputeNoiseQueue<Worley2d>>,
    mut worley_3d_queue: ResMut<ComputeNoiseQueue<Worley3d>>,
) {
    if noise_settings.is_changed() {
        let (handle_2d, handle_3d) = (noise_images.image_2d.clone(), noise_images.image_3d.clone());
        match &noise_settings.noise {
            NoiseType::Perlin2D(perlin) => {
                perlin_2d_queue.add_image(&mut images, handle_2d, perlin.clone());
                set_visibility(&mut query_2d, &mut query_3d, true);
            }
            NoiseType::Worley2D(worley) => {
                worley_2d_queue.add_image(&mut images, handle_2d, worley.clone());
                set_visibility(&mut query_2d, &mut query_3d, true);
            }
            NoiseType::Worley3D(worley) => {
                worley_3d_queue.add_image(&mut images, handle_3d, worley.clone());
                set_visibility(&mut query_2d, &mut query_3d, false);
            }
        };
    }
}

fn set_visibility(
    query_2d: &mut Query<&mut Visibility, (With<Handle<NoiseMaterial>>, Without<Handle<Noise3dMaterial>>)>,
    query_3d: &mut Query<&mut Visibility, (With<Handle<Noise3dMaterial>>, Without<Handle<NoiseMaterial>>)>,
    is_2d_visible: bool,
) {
    for mut visibility in query_2d.iter_mut() {
        *visibility = if is_2d_visible { Visibility::Visible } else { Visibility::Hidden };
    }
    for mut visibility in query_3d.iter_mut() {
        *visibility = if is_2d_visible { Visibility::Hidden } else { Visibility::Visible };
    }
}