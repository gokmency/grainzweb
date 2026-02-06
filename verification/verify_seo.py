
from playwright.sync_api import sync_playwright
import json

def verify_seo():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to homepage...")
        page.goto("http://localhost:8080/")

        # Wait for hydration/rendering
        page.wait_for_timeout(2000)

        # 1. Take Screenshot
        print("Taking screenshot...")
        page.screenshot(path="verification/homepage_seo.png")

        # 2. Verify Visible Content (Sanity Check)
        print("Verifying visible content...")
        # Use first() to avoid strict mode error if multiple elements exist (desktop/mobile)
        if page.get_by_text("WE BUILD THINGS").first.is_visible():
            print("SUCCESS: 'WE BUILD THINGS' is visible.")
        else:
            print("ERROR: 'WE BUILD THINGS' is NOT visible.")

        # 3. Verify JSON-LD Schema
        print("Verifying JSON-LD Schema...")
        # Get all JSON-LD scripts
        scripts = page.locator('script[type="application/ld+json"]').all_text_contents()

        found_gokmen = False
        found_kepez = False
        found_rich_bio = False

        if not scripts:
            print("ERROR: No JSON-LD scripts found!")

        for script_content in scripts:
            try:
                data = json.loads(script_content)
                print(f"Found JSON-LD: {json.dumps(data, indent=2)[:200]}...") # Print beginning

                # Helper to search recursively (as graph is flat or nested)
                str_data = json.dumps(data)

                if "Burak Gökmen Çelik" in str_data:
                    found_gokmen = True

                if "Kepez" in str_data and "Antalya" in str_data:
                    found_kepez = True

                # Check for a snippet of the rich bio
                if "extraordinary technology pioneer" in str_data:
                    found_rich_bio = True

            except json.JSONDecodeError:
                print("Error decoding JSON-LD")

        if found_gokmen:
            print("SUCCESS: Found 'Burak Gökmen Çelik' in Schema.")
        else:
            print("ERROR: 'Burak Gökmen Çelik' NOT found in Schema.")

        if found_kepez:
            print("SUCCESS: Found 'Kepez, Antalya' in Schema.")
        else:
            print("ERROR: 'Kepez, Antalya' NOT found in Schema.")

        if found_rich_bio:
            print("SUCCESS: Found Rich Bio content in Schema.")
        else:
            print("ERROR: Rich Bio content NOT found in Schema.")

        browser.close()

if __name__ == "__main__":
    verify_seo()
