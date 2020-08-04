/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
* @fileoverview Filter scheduled and draft posts out from a collection.
*/

const { env } = require('../_data/site');

/**
 * @param {object} post An eleventy post object.
 * @return {boolean} Whether or not the post should go live.
 */
function livePosts(post) {
  if (!post.date) {
    throw new Error(`${post.inputPath} did not specify a date.`);
  }

  if (!post.data) {
    throw new Error(
      `${post.inputPath} does not have a data object. Are you sure it's a post?`,
    );
  }

  // If we're in dev mode, force all posts to show up.
  // We do this after checking for scheduled posts so scheduled posts will get
  // their draft flag set and show the `draft` visual indicator.
  if (env === 'dev') {
    return true;
  }

  // Draft posts.
  // Draft posts should be excluded from collections in the prod environment.
  // nb. If a post has the `draft: true` flag set then it *will* still
  // generate a file but it will not be search crawlable.
  // However, if you know the URL you can view it in prod.
  // We may want to change this behavior somday.
  return !post.data.draft;
}

module.exports = livePosts;