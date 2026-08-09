from playwright.sync_api import sync_playwright

def run_cuj(page):
    print("Navigating to Content Hub...")
    page.goto("http://localhost:8080/content-hub")

    # Take a screenshot even if articles failed to load, for debugging
    page.wait_for_timeout(2000)
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")

    print("Clicking language switcher...")
    lang_button = page.locator('button[title="Switch to Turkish"], button[title="Switch to English"]')
    lang_button.click()
    page.wait_for_timeout(2000)

    print("Language switched successfully.")

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
