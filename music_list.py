import flet as ft
import os


class MusicList(ft.UserControl):
    def __init__(self):
        super().__init__()
        self.music = []
        self.file_picker = ft.FilePicker(on_result=self.folder_selected)
        self.permission_handler = ft.PermissionHandler(on_permission_result=self.permission_result)
        self.music_list = ft.ListView()

    def did_mount(self):
        # Adaugă FilePicker și PermissionHandler la overlay după ce pagina este inițializată
        self.page.overlay.append(self.file_picker)
        self.page.overlay.append(self.permission_handler)
        self.page.update()

    def permission_result(self, e):
        if e.status == ft.PermissionStatus.GRANTED:
            print("Permisiune acordată!")
            self.file_picker.pick_files(allow_multiple=True)
        else:
            print("Permisiune refuzată!")

    def app_bar(self):
        return ft.Container(
            ft.Row(controls=[
                ft.IconButton(icon=ft.icons.FOLDER, on_click=self.check_permission),
                ft.Text("APMusic", expand=True, text_align=ft.TextAlign.CENTER, size=24, color=ft.colors.BLUE),
                ft.IconButton(icon=ft.icons.SEARCH)
            ])
        )

    def check_permission(self, e):
        # Verifică permisiunea de stocare și solicită permisiunea dacă nu este acordată
        self.permission_handler.request_permission(ft.PermissionType.STORAGE)

    def folder_selected(self, e: ft.FilePickerResultEvent):
        if e.files:
            self.music.clear()
            for file in e.files:
                if file.name.lower().endswith((".mp3", ".mp4", ".m4a")):
                    # Construiește calea corectă folosind 'file.path'
                    self.music.append(file.path)
            self.update_music_list()

    def update_music_list(self):
        self.music_list.controls = [
            ft.ListTile(
                leading=ft.IconButton(icon=ft.icons.PLAY_ARROW, on_click=lambda e, song=song: self.play_music(song)),
                title=ft.Text(os.path.basename(song)),
            ) for song in self.music
        ]
        self.music_list.update()

    def play_music(self, path):
        # Aici vei gestiona redarea muzicii
        print(f"Playing music from path: {path}")

    def build(self):
        return ft.SafeArea(
            ft.Column([
                self.app_bar(),
                self.music_list
            ])
        )
