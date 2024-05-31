use bevy::{prelude::*, render::mesh::VertexAttributeValues};
use bevy_procedural_grass::prelude::*;
use wasm_bindgen::prelude::*;
use noise::NoiseFn;

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
            ProceduralGrassPlugin {
                wind: GrassWind {
                    wind_data: Wind {
                        speed: 0.1,
                        amplitude: 4.0,
                        ..default()
                    },
                    ..default()
                },
                ..default()
            }
        ))
        .add_systems(Startup, setup)
        //.add_systems(Update, on_resize)
        .run();
}

fn setup(
    mut commands: Commands,
    mut materials: ResMut<Assets<StandardMaterial>>,
    mut meshes: ResMut<Assets<Mesh>>,
) {
    let mut terrain_mesh = Mesh::from(shape::Plane { size: 100.0, subdivisions: 100 });
    if let Some(positions) = terrain_mesh.attribute_mut(Mesh::ATTRIBUTE_POSITION) {
        if let VertexAttributeValues::Float32x3(positions) = positions {
            for position in positions.iter_mut() {
                let y = noise::Perlin::new(1).get([((position[0]) * 0.05) as f64, ((position[2]) * 0.05) as f64]) as f32;
                position[1] += y;
            }
        }
    }

    let terrain = commands.spawn(
        PbrBundle {
            mesh: meshes.add(terrain_mesh),
            material: materials.add(StandardMaterial {
                base_color: Color::rgb(0.0, 0.05, 0.0),
                reflectance: 0.0,
                ..default()
            }),
            transform: Transform::from_scale(Vec3::new(1.0, 3.0, 1.0)),
            ..default()
        }
    ).id();

    commands.spawn(
        GrassBundle {
            mesh: meshes.add(GrassMesh::mesh(7)),
            lod: GrassLODMesh::new(meshes.add(GrassMesh::mesh(3))),
            grass: Grass {
                entity: Some(terrain.clone()),
                ..default()
            },
            ..default()
        }
    );

    commands.spawn(
        PbrBundle {
            mesh: meshes.add(Mesh::from(shape::Cylinder { radius: 0.75, height: 4.0, ..default()})),
            material: materials.add(StandardMaterial::from(Color::WHITE)),
            transform: Transform::from_translation(Vec3::new(0.0, 2.0, 0.0)),
            ..default()
        }
    );

    commands.spawn(DirectionalLightBundle {
        directional_light: DirectionalLight {
            shadows_enabled: true,
            ..default()
        },
        transform: Transform::from_rotation(Quat::from_xyzw(
            -0.4207355,
            -0.4207355,
            0.22984886,
            0.77015114
        )),
        ..default()
    });

    commands.spawn(Camera3dBundle {
        transform: Transform::from_xyz(-2.5, 4.5, 9.0).looking_at(Vec3::new(2.5, 3.5, 0.0), Vec3::Y),
        ..default()
    });
}