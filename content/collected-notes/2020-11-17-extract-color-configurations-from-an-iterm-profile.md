{
  "title": "Extract color configurations from an iTerm profile",
  "date": "2020-11-17T06:13:26.831Z",
  "lastmod": "2020-11-17T06:13:26.831Z",
  "layout": "post",
  "originalUrl": "https://collectednotes.com/awendland/extract-color-configurations-from-an-iterm-profile",
  "visibility": "public"
}

Moving colors from one iTerm profile to another is difficult because all the color configurations appear as separate, un-namespaced entries in the profile's exported JSON.

The following [jq](https://stedolan.github.io/jq/manual/) command can be used to pull out all the configuration items that have a `"Red Component"` sub-property, which all the color properties will have.

```sh
jq 'with_entries(select(.value."Red Component"? != null))'
```

The command's components are:

* [with_entries(fn)](https://stedolan.github.io/jq/manual/#to_entries,from_entries,with_entries) processes the JSON object's properties (transformed into `{"key": props_key, "value": props_value}`) with `fn`.
* [select(boolean_expression)](https://stedolan.github.io/jq/manual/#select(boolean_expression)) removes items that don't match the boolean expression.
* `.value."Red Component"? != null` is a boolean expression that only returns true if the property had a sub-property called "Red Component" that wasn't null. The `?` operator returns "null" instead of throwing an error if the property doesn't contain "Red Component" as a sub-property.

---

For example, to use the "Solarized Dark" color preset in a [Dynamic Profile](https://iterm2.com/documentation-dynamic-profiles.html) do the following:

1. Create a new profile
2. Set the color preset to "Solarized Dark"
3. In the sidebar, select the new profile then choose "Save profile as JSON"
4. Run the aforementioned `jq` command
5. Copy the outputted keys into the Dynamic Profile

This approach may be preferable to simply duplicating the Dynamic Profile, updating the settings, exporting the new one, and overwriting the original because it keeps the Dynamic Profile to the minimum set of configuration properties instead of the huge dump of properties that are added whenever an iTerm profile is exported.
