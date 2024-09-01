interface EmailTemplateProps {
	firstName: string;
}

import { Button, Html } from '@react-email/components';
import * as React from 'react';

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	firstName = 'John',
}) => {
	return (
		<Html>
			<Button
				href="https://example.com"
				style={{ background: '#000', color: '#fff', padding: '12px 20px' }}
			>
				{firstName}
			</Button>
		</Html>
	);
};

export default EmailTemplate;
