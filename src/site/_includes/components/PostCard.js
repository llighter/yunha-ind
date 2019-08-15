const { html } = require('common-tags');
const stripLanguage = require('../../_filters/strip-language');

/* eslint-disable require-jsdoc,indent */

/**
 * PostCard used to preview posts.
 * @param {Object} post An eleventy collection item with post data.
 * @return {string}
 */
module.exports = ({post}) => {
  const url = stripLanguage(post.url);
  const data = post.data;
  const hero = data && data.hero;

  function renderHero(post, url) {
    return html`
      <figure class="w-post-card__figure">
        <img class="w-post-card__image" src="${url + hero}" alt="${data.alt}" />
      </figure>
    `;
  }

  return html`
      <a href='${ post.url }' class="mdc-layout-grid__cell w-card">
        <div class="mdc-card mdc-card--outlined yunha-inc-card">
          <div class="yunha-inc-image mdc-card__media mdc-card__media--square"
            style="background-image: url('${post.url + hero}')"></div>
          <div class="yunha-inc-card__text-label">${ data.title }</div>
          <div class="yunha-inc-card__secondary mdc-typography--body2">${ data.subhead }</div>
          <div class="mdc-card__actions">
            <div class="mdc-card__action-buttons">
              <button class="mdc-button mdc-card__action mdc-card__action--button adopt-form__button">
                <i class="material-icons mdc-button__icon">favorite_border</i> <span>Show</span>
              </button>
            </div>
          </div>
        </div>
      </a>
  `;
}

//   return html`
//     <a href="${url}" class="w-card">
//       <article class="w-post-card">
//         <div
//           class="w-post-card__cover ${hero && `w-post-card__cover--with-image`}"
//         >
//           ${hero && renderHero(post, url)}
//           <h2
//             class="${hero
//               ? `w-post-card__headline--with-image`
//               : `w-post-card__headline`}"
//           >
//             ${data.title}
//           </h2>
          
//         </div>
//         <div class="w-post-card__desc">
//           <p class="w-post-card__subhead">
//             ${data.subhead}
//           </p>
//         </div>
//       </article>
//     </a>
//   `;
// };
