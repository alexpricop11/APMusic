from music_list import MusicList
import flet as ft


def main(page: ft.Page):
    page.title = "APMusic"
    page.theme_mode = 'dark'
    page.window.width = 350
    page.window.height = 700
    page.add(MusicList())


if __name__ == '__main__':
    ft.app(main, upload_dir="uploads")



