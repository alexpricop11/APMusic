import flet as ft


def main(page: ft.Page):
    page.title = "APMusic"
    page.theme_mode = 'dark'
    page.add(ft.Text("Music"))


ft.app(main)
