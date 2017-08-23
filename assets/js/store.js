---
---
window.store = {
{% for post in site.posts %}
  "{{ post.url | slugify }}": {
    "title"   : {{ post.title | jsonify }},
    "url"     : {{ post.url | jsonify }},
    "date"    : {{ post.date | date: '%B %-d, %Y' | jsonify }}
  }{% unless forloop.last %},{% endunless %}
{% endfor %}
}
