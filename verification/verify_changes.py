from playwright.sync_api import sync_playwright, expect

def mock_hashnode_graphql(route, request):
    if "PublicationPosts" in request.post_data:
        # Mocking the list of posts (related articles)
        # We need to return enough posts to show that slice is working (e.g., 6 posts).
        # We also need to mock PublicationPostBySlug to load the page initially.
        print("Mocking PublicationPosts")

        # Create 6 dummy posts
        edges = []
        for i in range(1, 8): # 7 posts total
            edges.append({
                "cursor": f"cursor-{i}",
                "node": {
                    "id": f"post-{i}",
                    "title": f"Test Article {i}",
                    "slug": f"test-article-{i}",
                    "brief": f"This is test article {i}",
                    "url": f"https://grainz.site/article-{i}",
                    "publishedAt": "2023-10-27T00:00:00Z",
                    "readTimeInMinutes": 5,
                    "coverImage": {"url": "https://via.placeholder.com/150"},
                    "tags": [{"name": "Tech", "slug": "tech"}]
                }
            })

        response_body = {
            "data": {
                "publication": {
                    "posts": {
                        "edges": edges,
                        "pageInfo": {
                            "hasNextPage": False,
                            "endCursor": "cursor-7"
                        }
                    }
                }
            }
        }
        route.fulfill(json=response_body)
    elif "PublicationPostBySlug" in request.post_data:
        # Mocking the current post
        print("Mocking PublicationPostBySlug")
        response_body = {
            "data": {
                "publication": {
                    "post": {
                        "id": "current-post",
                        "title": "Current Article",
                        "slug": "current-article",
                        "brief": "This is the current article",
                        "url": "https://grainz.site/current-article",
                        "publishedAt": "2023-10-27T00:00:00Z",
                        "readTimeInMinutes": 5,
                        "coverImage": {"url": "https://via.placeholder.com/150"},
                        "tags": [{"name": "Tech", "slug": "tech"}],
                        "author": {
                            "name": "Test Author",
                            "username": "testauthor",
                            "profilePicture": None
                        },
                        "content": {
                            "html": "<p>Content of the article</p>"
                        }
                    }
                }
            }
        }
        route.fulfill(json=response_body)
    else:
        route.continue_()

def verify_related_articles():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Intercept GraphQL requests
        page.route("https://gql.hashnode.com/graphql", mock_hashnode_graphql)

        # Navigate to a dummy article page
        # Note: The dev server port might vary, assuming 5173
        page.goto("http://localhost:8080/content-hub/article/current-article")

        # Wait for the article to load
        page.wait_for_selector("h1:has-text('Current Article')")

        # Wait for related articles to load
        # We expect "Related Articles" section
        page.wait_for_selector("text=Related Articles")

        # Count the number of related articles
        # They are in a grid inside the section.
        # Selector: section containing "Related Articles" -> grid -> article
        # We can select all 'article' elements inside the section with h3 "Related Articles"

        # Or just select all links inside the related articles section
        related_articles = page.locator("section:has-text('Related Articles') article")
        count = related_articles.count()
        print(f"Found {count} related articles.")

        # Verification:
        # We mocked 7 posts in total.
        # 1 is "current-article" (not in the list we mocked for PublicationPosts? No, we mocked list separately).
        # In listPublicationPosts mock, we returned 7 posts: test-article-1 to 7.
        # The current article is "current-article".
        # So "current-article" is NOT in the list of 7 posts.
        # So filter(p => p.slug !== blogPost?.slug) won't filter anything out from the 7 posts.
        # We slice(0, 6).
        # So we expect 6 related articles.

        if count == 6:
            print("SUCCESS: Found 6 related articles as expected.")
        else:
            print(f"FAILURE: Expected 6 related articles, found {count}.")

        page.screenshot(path="verification/related_articles.png", full_page=True)
        browser.close()

if __name__ == "__main__":
    verify_related_articles()
