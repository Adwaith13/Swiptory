import React from 'react'
import Stories from 'react-insta-stories'

export const Story = () => {
	return (
		<Stories
			stories={stories}
			defaultInterval={1500}
			width={432}
			height={768}
		/>
	);
};
