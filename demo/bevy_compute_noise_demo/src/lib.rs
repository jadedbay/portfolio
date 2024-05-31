use bevy::{asset::embedded_asset, prelude::*, render::{mesh::VertexAttributeValues, render_resource::{AsBindGroup, ShaderRef}, texture::{ImageAddressMode, ImageSampler, ImageSamplerDescriptor}}, sprite::{Material2d, Material2dPlugin, MaterialMesh2dBundle, Mesh2dHandle}, window::WindowResized};
use bevy_compute_noise::prelude::*;
use bevy_inspector_egui::quick::WorldInspectorPlugin;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn demo(canvas_id: String) {
    App::new()
        .add_plugins((
            DefaultPlugins.set(WindowPlugin {
                primary_window: Some(Window {
                    canvas: Some(canvas_id),
                    resizable: true,
                    ..default()
                }),
                ..default()
            }),
            WorldInspectorPlugin::new(),
            NoiseMaterialPlugin,
            ComputeNoisePlugin::<Perlin2d>::default(),
        ))
        .add_systems(Startup, setup)
        .add_systems(Update, on_resize)
        .run();
}

fn setup(
    mut commands: Commands,
    mut images: ResMut<Assets<Image>>,
    mut meshes: ResMut<Assets<Mesh>>,
    mut materials: ResMut<Assets<NoiseMaterial>>,
) {
    let mut image = ComputeNoiseImage::create_image(ComputeNoiseSize::D2(1024, 1024));
    image.sampler = ImageSampler::Descriptor(ImageSamplerDescriptor {
        address_mode_u: ImageAddressMode::Repeat,
        address_mode_v: ImageAddressMode::Repeat,
        ..default()
    });
    let handle = images.add(image);


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
            mesh: meshes.add(quad).into(),
            transform: Transform::default().with_scale(Vec3::splat(512.)),
            material: materials.add(NoiseMaterial {
                image: handle.clone()
            }),
            ..default()
        },
        ComputeNoiseComponent::<Perlin2d> {
            image: handle.clone(),
            noise: Perlin2d::new(0, 5, 4, true),
        },
    ));

    commands.spawn(Camera2dBundle::default());
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

struct NoiseMaterialPlugin;

impl Plugin for NoiseMaterialPlugin {
    fn build(&self, app: &mut App) {
        embedded_asset!(app, "shaders/noise_2d_material.wgsl");

        app.add_plugins(Material2dPlugin::<NoiseMaterial>::default());
    }
}

fn on_resize(
    mut query: Query<&mut Transform, With<Mesh2dHandle>>,
    mut resize_reader: EventReader<WindowResized>,
) {
    for e in resize_reader.read() {
        for mut transform in query.iter_mut() {
            //web_sys::console::log_1(&format!("Window resized to: {}x{}", e.width, e.height).into());
            transform.scale = Vec3::splat(f32::min(e.width as f32 / 2.0, e.height as f32 - 24.0));
        }
    }
}