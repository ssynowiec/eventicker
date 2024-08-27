interface EventAdminPageProps {
	params: { slug: string };
}

const EventAdminPage = ({ params: { slug } }: EventAdminPageProps) => {
	return slug;
};

export default EventAdminPage;
