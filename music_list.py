import flet as ft
import os


class MusicList(ft.UserControl):
    def __init__(self):
        super().__init__()
        self.music = []
        self.file_picker = ft.FilePicker(on_result=self.folder_selected)
        self.music_list = ft.ListView()

    def app_bar(self):
        return ft.Container(
            ft.Row(controls=[
                ft.IconButton(icon=ft.icons.FOLDER, on_click=self.open_select_folder),
                ft.Text("APMusic", expand=True, text_align=ft.TextAlign.CENTER, size=24, color=ft.colors.BLUE),
                ft.IconButton(icon=ft.icons.SEARCH)
            ])
        )

    def open_select_folder(self, e):
        self.file_picker.get_directory_path()
        self.page.overlay.append(self.file_picker)

    def folder_selected(self, e: ft.FilePickerResultEvent):
        if e.path:
            selected_folder = e.path
            self.music.clear()
            for root, dirs, files in os.walk(selected_folder):
                for file in files:
                    if file.lower().endswith((".mp3", ".mp4", ".m4a")):
                        path = os.path.join(root, file)
                        self.music.append(path)
            self.update_music_list()

    def update_music_list(self):
        self.music_list.controls = [
            ft.ListTile(
                leading=ft.IconButton(icon=ft.icons.PLAY_ARROW, on_click=self.play_music(song)),
                title=ft.Text(os.path.basename(song)),
            ) for song in self.music
        ]
        self.music_list.update()

    def play_music(self, path):
        # Handle the logic for playing the music
        print(f"Playing music from path: {path}")

    def build(self):
        return ft.SafeArea(
            ft.Column([
                self.app_bar(),
                self.file_picker,
                self.music_list
            ])
        )
