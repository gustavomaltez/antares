use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct ResumeMetadata {
    pub name: String,
    pub created_at: i64,
    pub size_in_bytes: u64,
    pub page_count: u32,
}

#[derive(Serialize, Clone)]
pub struct Resume {
    pub data: Vec<u8>,
    pub metadata: ResumeMetadata,
}