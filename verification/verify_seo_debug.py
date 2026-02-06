
from playwright.sync_api import sync_playwright
import json

def verify_seo():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to homepage...")
        page.goto("http://localhost:8080/")

        page.wait_for_timeout(2000)

        print("Verifying JSON-LD Schema...")
        scripts = page.locator('script[type="application/ld+json"]').all_text_contents()

        found_gokmen = False

        for script_content in scripts:
            try:
                data = json.loads(script_content)
                # Ensure we don't escape unicode when dumping to string for search
                str_data = json.dumps(data, ensure_ascii=False)

                if "Burak Gökmen Çelik" in str_data:
                    found_gokmen = True
                else:
                     print(f"DEBUG: Did not find name in: {str_data[:500]}...")

            except json.JSONDecodeError:
                print("Error decoding JSON-LD")

        if found_gokmen:
            print("SUCCESS: Found 'Burak Gökmen Çelik' in Schema (with ensure_ascii=False).")
        else:
            print("ERROR: 'Burak Gökmen Çelik' STILL NOT found.")

        browser.close()

if __name__ == "__main__":
    verify_seo()
