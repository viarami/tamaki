/**
 * Create the Metadata for the page
 */

export default function(post) {
  let metadata = {
    htmlAttrs: {
      lang: post.lang
    },
    meta: []
  }

  if (post.data.title.length > 0) {
    metadata.title = post.data.title[0].text
    metadata.meta.push(
      {
        property: 'og:title',
        content: post.data.title[0].text
      },
      {
        property: 'twitter:title',
        content: post.data.title[0].text
      }
    )
  }

  if (post.data.meta_description.length > 0) {
    metadata.meta.push(
      {
        hid: 'description',
        name: 'description',
        content: post.data.meta_description[0].text
      },
      {
        property: 'og:description',
        content: post.data.meta_description[0].text
      },
      {
        property: 'twitter:description',
        content: post.data.meta_description[0].text
      }
    )
  }

  if (post.data.main_image.social.url !== undefined) {
    metadata.meta.push(
      { property: 'og:image', content: post.data.main_image.social.url },
      { property: 'twitter:image', content: post.data.main_image.social.url }
    )
  }

  return metadata
}
