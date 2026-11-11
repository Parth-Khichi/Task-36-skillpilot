Lazy Loading Comments for Posts
Project Overview

Implement lazy loading of comments for each post using a separate API call. Comments should only be fetched when a user clicks the View Comments button for a specific post.

The implementation should include graceful error handling and a user-friendly fallback UI when requests fail.

Task Implementation Steps
1. Add a Comment Button to Each Post
Add a View Comments button to every post.
Allow users to load comments individually for each post.
Display a loading indicator when comments are being fetched.
2. Fetch Comments on Click
Trigger an API request when the user clicks the comment button.
Fetch comments using the post ID.

API Endpoint:

http
GET /comments?post_id={postId}


Example:

javascript
async function fetchComments(postId) {
  const response = await fetch(
    `/comments?post_id=${postId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return await response.json();
}

3. Insert Comments into the DOM
Display the fetched comments below the corresponding post.
Ensure comments are displayed under the correct post.
Avoid unnecessary API calls when comments are already loaded.
Show an appropriate message if no comments are available.
4. Handle Network Errors with Fallback UI
Handle API errors and network failures.
Display a user-friendly error message.
Provide a retry option.
Ensure the application does not crash if the API request fails.
Expected Behavior
Initially, comments are not loaded.
The user clicks the comment button.
The application sends an API request for that post.
A loading indicator appears.
Comments are displayed when the request succeeds.
An error message and retry option appear if the request fails.
Error Handling
Scenario	Expected Result
Successful API request	Display comments
Empty comments response	Display "No comments yet"
Network failure	Display an error message
API error	Show fallback UI
Retry clicked	Fetch comments again
Acceptance Criteria
Each post has its own comment button.
Comments load only when requested.
Each API request uses the correct post ID.
Comments appear under the correct post.
Loading states are displayed.
Network errors are handled gracefully.
Users can retry failed requests.
Previously loaded comments are not unnecessarily fetched again.
Conclusion

The goal is to improve application performance by implementing lazy loading for post comments. This reduces unnecessary API requests, improves initial page loading, and provides a better user experience through proper loading and error states.
