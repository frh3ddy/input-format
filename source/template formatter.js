import { count_occurences } from './helpers'

// Takes a `template` where character placeholders
// are denoted by 'x'es (e.g. 'x (xxx) xxx-xx-xx').
//
// Returns a function which takes `value` characters
// and returns the `template` filled with those characters.
// If the `template` can only be partially filled
// then it is cut off.
//
export default function template_formatter(template, placeholder = 'x')
{
	if (!template)
	{
		return value => ({ text: value })
	}

	const characters_in_template = count_occurences(placeholder, template)

	return function(value)
	{
		if (!value)
		{
			return { text: '', template }
		}

		let value_character_index = 0
		let filled_in_template = ''

		for (const character of template)
		{
			if (character !== placeholder)
			{
				filled_in_template += character
				continue
			}

			filled_in_template += value[value_character_index]
			value_character_index++

			// If the last available value character has been filled in,
			// then return the filled in template
			// (either trim the right part or retain it,
			//  if no more character placeholders in there)
			if (value_character_index === value.length)
			{
				// If there are more character placeholders
				// in the right part of the template
				// then simply trim it.
				if (value.length < characters_in_template)
				{
					break
				}
			}
		}

		return { text: filled_in_template, template }
	}
}