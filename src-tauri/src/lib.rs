#[tauri::command]
fn save_base_resume(data: Vec<u8>, name: String) -> Result<String, String> {
    println!("Received '{}' with {} bytes", name, data.len());
    std::fs::write(&name, &data).map_err(|e| e.to_string())?;
    Ok("File saved successfully".into())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![save_base_resume])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
