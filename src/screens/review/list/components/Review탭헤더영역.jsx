import useScroll from '@hooks/useScroll';

const Review탭헤더영역 = ({ refScrollContainer, children }) => {
	const { scrollY } = useScroll(refScrollContainer, 50);

	return <div className={`scroll_checker ${scrollY > 0 ? 'scrolled' : ''}`}>{children}</div>;
};

export default Review탭헤더영역;
