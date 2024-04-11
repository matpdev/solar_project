use serde::{ Deserialize, Serialize };

#[derive(Debug, Deserialize, Serialize, Clone)]
#[allow(private_interfaces)]
pub struct Structure {
    pub id: u64,
    pub name: String,
    pub description: String,
    pub lat: f64,
    pub lng: f64,
    pub struct_length: StructureLength,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct StructureLength {
    pub height: u64,
    pub square_size: u64,
    pub width: u64,
}
