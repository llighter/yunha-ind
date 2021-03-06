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

const path = require('path');
const site = require('../../_data/site');
const {html} = require('common-tags');

/* eslint-disable max-len */

module.exports = (learningPath) => {
  let linkText;
  if (learningPath.slug === 'blog') {
    linkText = learningPath.titleVariation;
  } else {
    linkText = learningPath.title;
  }

  return html`
    <ul class="w-breadcrumbs">
      <li class="w-breadcrumbs__crumb">
        <a
          class="w-breadcrumbs__link w-breadcrumbs__link--left-justify"
          href="/"
        >
          ${site.titleVariation}
        </a>
      </li>
      <li class="w-breadcrumbs__crumb">
        <a
          class="w-breadcrumbs__link"
          href=${path.join('/', learningPath.slug)}
        >
          ${linkText}
        </a>
      </li>
    </ul>
  `;
};
