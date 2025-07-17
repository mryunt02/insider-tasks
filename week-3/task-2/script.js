$(document).ready(function () {
  let currentPage = 0;
  const postsPerPage = 5;
  let isLoading = false;
  let hasMorePosts = true;
  const maxPosts = 100;

  const $postContainer = $("#postContainer");
  const $loadingIndicator = $("#loadingIndicator");
  const $errorMessage = $("#errorMessage");
  const $retryButton = $("#retryButton");

  function loadPosts() {
    if (isLoading || !hasMorePosts) return;

    isLoading = true;
    showLoading();
    hideError();

    const startIndex = currentPage * postsPerPage;

    $.get(
      `https://jsonplaceholder.typicode.com/posts?_start=${startIndex}&_limit=${postsPerPage}`
    )
      .done(function (posts) {
        if (posts.length === 0 || startIndex >= maxPosts) {
          hasMorePosts = false;
          hideLoading();
          if (startIndex >= maxPosts) {
            showEndMessage();
          }
          return;
        }

        posts.forEach(function (post, index) {
          setTimeout(function () {
            const postElement = createPostElement(post);
            $postContainer.append(postElement);
          }, index * 100);
        });

        currentPage++;
        isLoading = false;
        hideLoading();
      })
      .fail(function () {
        isLoading = false;
        hideLoading();
        showError();
      });
  }

  function createPostElement(post) {
    return `
            <div class="post">
                <div class="post-header">
                    <span class="post-id">#${post.id}</span>
                    <span class="post-user">User ${post.userId}</span>
                </div>
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;
  }

  function showLoading() {
    $loadingIndicator.removeClass("hidden");
  }

  function hideLoading() {
    $loadingIndicator.addClass("hidden");
  }

  function showError() {
    $errorMessage.removeClass("hidden");
  }

  function hideError() {
    $errorMessage.addClass("hidden");
  }

  function showEndMessage() {
    $postContainer.append(
      '<div class="end-message">All posts have been loaded!</div>'
    );
  }

  function isNearBottom() {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    const documentHeight = $(document).height();

    return scrollTop + windowHeight >= documentHeight - 200;
  }

  $(window).scroll(function () {
    if (isNearBottom()) {
      loadPosts();
    }
  });

  $retryButton.click(function () {
    loadPosts();
  });

  loadPosts();
});
