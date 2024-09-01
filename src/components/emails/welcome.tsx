import {
	Body,
	Button,
	Container,
	Column,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Text,
	Tailwind,
} from '@react-email/components';
import type { FC } from 'react';

interface WelcomeEmailProps {
	name: string;
}

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000';

const WelcomeEmail: FC<Readonly<WelcomeEmailProps>> = ({
	name = 'John Doe',
}) => {
	const previewText = `Welcome ${name} on Eventicker!`;

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="mx-auto my-auto bg-white px-2 font-sans">
					<Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
						<Section className="mt-[32px]">
							<Img
								src={`${baseUrl}/draft-logo-dark.png`}
								width="40"
								height="40"
								alt="Eventicker"
								className="mx-auto my-0"
							/>
						</Section>
						<Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
							Welcome <strong>{name}</strong> on <strong>Eventicker</strong>!
						</Heading>
						<Text className="text-[14px] leading-[24px] text-black">
							Hello {name},
						</Text>
						<Section className="mb-[32px] mt-[32px] text-center">
							<Button
								className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
								href={`${baseUrl}/dashboard`}
							>
								Get Started
							</Button>
						</Section>

						<Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
						<Section className="text-center">
							<table className="w-full">
								<tr className="w-full">
									<td align="center">
										<Img
											alt="React Email logo"
											height="42"
											src={`${baseUrl}/draft-logo-dark.png`}
										/>
									</td>
								</tr>
								<tr className="w-full">
									<td align="center">
										<Text className="my-[8px] text-[16px] font-semibold leading-[24px] text-gray-900">
											Eventicker
										</Text>
									</td>
								</tr>
								<tr>
									<td align="center">
										<Row className="table-cell h-[44px] w-[56px] align-bottom">
											<Column className="pr-[8px]">
												<Link href="#">
													<Img
														alt="Facebook"
														height="36"
														src="/static/facebook-logo.png"
														width="36"
													/>
												</Link>
											</Column>
											<Column className="pr-[8px]">
												<Link href="#">
													<Img
														alt="X"
														height="36"
														src="/static/x-logo.png"
														width="36"
													/>
												</Link>
											</Column>
											<Column>
												<Link href="#">
													<Img
														alt="Instagram"
														height="36"
														src="/static/instagram-logo.png"
														width="36"
													/>
												</Link>
											</Column>
										</Row>
									</td>
								</tr>
								<tr>
									<td align="center">
										<Link
											href="mailto:contact@eventicker.ssynowiec.pl"
											className="text-black"
										>
											contact@eventicker.ssynowiec.pl
										</Link>
									</td>
								</tr>
							</table>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default WelcomeEmail;
