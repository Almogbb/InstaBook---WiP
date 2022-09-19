import { httpService } from './http.service';

// const feedEndpoint = 'feed';
// const authEndpoint = 'auth';

async function getPosts() {
  return httpService.get('feed/posts');
}

async function addPost(post) {
  return httpService.post('feed/post', post);
}

async function editPost(post) {
  return httpService.put(`feed/post/:${post._id}`, post);
}

async function removePostById(postId) {
  return httpService.delete(`feed/post/${postId}`, postId);
}

export const feedService = {
  getPosts,
  addPost,
  removePostById,
  editPost,
};
