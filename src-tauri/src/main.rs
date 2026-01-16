#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::image::Image;
use tauri::menu::{MenuBuilder, MenuItemBuilder, PredefinedMenuItem, SubmenuBuilder};
use tauri::Manager;

fn load_icon(path: std::path::PathBuf) -> Result<Image<'static>, Box<dyn std::error::Error>> {
  let img = image::open(path)?.into_rgba8();

  let (width, height) = img.dimensions();
  let rgba = img.into_raw();

  Ok(Image::new_owned(rgba, width, height))
}

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      let icon_path = app
        .path()
        .resolve("icons/icon.png", tauri::path::BaseDirectory::Resource)
        .expect("failed to resolve icon");

      let icon = load_icon(icon_path).expect("failed to load icon");

      let about = PredefinedMenuItem::about(
        app,
        None,
        Some(tauri::menu::AboutMetadata {
          name: Some(app.package_info().name.clone()),
          version: Some(app.package_info().version.to_string()),
          copyright: Some("© 2026 Company Inc.".to_string()),
          icon: Some(icon),
          ..Default::default()
        }),
      )?;

      let quit = MenuItemBuilder::with_id("quit", "Quit")
        .accelerator("CmdOrCtrl+Q")
        .build(app)?;

      let app_menu = SubmenuBuilder::new(app, &app.package_info().name)
        .item(&about)
        .separator()
        .item(&quit)
        .build()?;

      let menu = MenuBuilder::new(app).item(&app_menu).build()?;
      app.set_menu(menu)?;

      Ok(())
    })
    .on_menu_event(|app, event| {
      if event.id() == "quit" {
        app.exit(0);
      }
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
