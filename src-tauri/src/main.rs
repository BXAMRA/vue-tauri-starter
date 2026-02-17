#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

#[tauri::command]
fn minimize_window(app: tauri::AppHandle) {
  if let Some(window) = app.get_webview_window("main") {
    let _ = window.minimize();
  }
}

#[tauri::command]
fn close_window(app: tauri::AppHandle) {
  app.exit(0);
}

#[tauri::command]
fn start_dragging(app: tauri::AppHandle) {
  if let Some(window) = app.get_webview_window("main") {
    let _ = window.start_dragging();
  }
}

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_os::init())
    .plugin(tauri_plugin_process::init())
    .plugin(tauri_plugin_store::Builder::new().build())
    .invoke_handler(tauri::generate_handler![
      minimize_window,
      close_window,
      start_dragging,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
