from playwright.sync_api import sync_playwright
import time
import os

def run_cuj(page):
    print("Navigating to homepage...")
    page.goto("http://localhost:8080/")
    page.wait_for_timeout(1000)

    print("Locating TR button...")
    tr_btn = page.locator("nav button", has_text="TR")
    print("Clicking TR...")
    tr_btn.click()
    page.wait_for_timeout(1000)

    # Take screenshot in TR mode
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(500)

    print("Navigating to Content Hub...")
    content_hub_tr = page.locator("nav a", has_text="İçerik Merkezi")
    content_hub_tr.click()
    page.wait_for_timeout(1000)

    print("Locating EN button on Content Hub...")
    en_btn = page.locator("nav button", has_text="EN")
    print("Clicking EN...")
    en_btn.click()
    page.wait_for_timeout(1000)

    print("Navigating back to Home...")
    home_en = page.locator("nav a", has_text="Home")
    home_en.click()
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={"width": 1280, "height": 720}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
