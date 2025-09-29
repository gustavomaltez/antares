use crate::resume::metadata::{Resume, ResumeMetadata};
use serde_json;
use std::fs;
use std::time::{SystemTime, UNIX_EPOCH};
use tauri::AppHandle;
use tauri::Manager;

fn save_base_resume_metadata(app: &AppHandle, data: Vec<u8>, name: String) -> Result<(), String> {
    let dir = app
        .path()
        .app_local_data_dir()
        .map_err(|_| "No app dir".to_string())?;
    let metadata = ResumeMetadata {
        name,
        created_at: (SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs()
            * 1000) as i64,
        size_in_bytes: data.len() as u64,
        page_count: 0, // Placeholder, actual page count calculation will be added later
    };
    let serialized_data = serde_json::to_vec(&metadata).map_err(|e| e.to_string())?;
    let metadata_path = dir.join("base_resume_metadata.json");
    fs::write(metadata_path, serialized_data).map_err(|e| e.to_string())?;
    Ok(())
}

fn get_base_resume_metadata(app: &AppHandle) -> Result<ResumeMetadata, String> {
    let dir = app
        .path()
        .app_local_data_dir()
        .map_err(|_| "No app dir".to_string())?;
    let metadata_path = dir.join("base_resume_metadata.json");
    let data = fs::read(metadata_path).map_err(|e| e.to_string())?;
    let metadata: ResumeMetadata = serde_json::from_slice(&data).map_err(|e| e.to_string())?;
    Ok(metadata)
}

#[tauri::command]
pub fn save_base_resume(app: AppHandle, data: Vec<u8>, name: String) -> Result<String, String> {
    let dir = app
        .path()
        .app_local_data_dir()
        .map_err(|_| "No app dir".to_string())?;
    let file_path = dir.join("base_resume.docx");
    fs::write(&file_path, &data).map_err(|e| e.to_string())?;
    save_base_resume_metadata(&app, data, name)?;
    Ok("File saved successfully".into())
}

#[tauri::command]
pub fn get_base_resume(app: AppHandle) -> Result<Resume, String> {
    let dir = app
        .path()
        .app_local_data_dir()
        .map_err(|_| "No app dir".to_string())?;
    let file_path = dir.join("base_resume.docx");
    let data = fs::read(&file_path).map_err(|e| e.to_string())?;
    let metadata = get_base_resume_metadata(&app)?;
    Ok(Resume { data, metadata })
}
