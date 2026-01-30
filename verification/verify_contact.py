from playwright.sync_api import sync_playwright
import time

def verify_contact():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the Contact page directly (handling hash router)
        url = "http://localhost:4173/LuCent/demo/#/contact"
        print(f"Navigating to {url}")
        page.goto(url)

        # Wait for hydration and rendering
        # We expect the text "Welcome to the LuCent Help Center"
        # Using a relaxed locator to find it
        try:
            # Wait for h1 to be visible
            page.wait_for_selector("h1", timeout=5000)

            # Check for specific text content
            content = page.content()
            if "Welcome to the" in content and "Help Center" in content:
                print("SUCCESS: Found 'Welcome to the ... Help Center'")
            else:
                print("FAILURE: Content not found")
                print("Page content snippet:", content[:500])

            # Take screenshot
            page.screenshot(path="verification/contact_page.png")
            print("Screenshot saved to verification/contact_page.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_page.png")

        browser.close()

if __name__ == "__main__":
    # Give the server a moment to ensure it's listening
    time.sleep(2)
    verify_contact()
