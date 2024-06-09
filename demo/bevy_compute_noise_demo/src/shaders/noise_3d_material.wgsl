#import bevy_pbr::forward_io::VertexOutput

@group(2) @binding(101) var texture: texture_3d<f32>;
@group(2) @binding(102) var texture_sampler: sampler;
@group(2) @binding(103) var<uniform> layer: u32;
@group(2) @binding(104) var<uniform> texture_size: vec3<u32>;

@fragment
fn fragment(
    mesh: VertexOutput,
) -> @location(0) vec4<f32> {
    let value = textureSample(texture, texture_sampler, vec3<f32>(mesh.uv, f32(layer) / f32(texture_size.z)), vec3<i32>(0));
    return vec4<f32>(vec3<f32>(value.x), 1.0);
}