const currentYear = new Date().getFullYear();

export const Footer = () => {
	return (
		<footer className="bg-foreground p-4 text-center text-sm text-white">
			<p>&copy; {currentYear} Eventicker. All rights reserved.</p>
		</footer>
	);
};
