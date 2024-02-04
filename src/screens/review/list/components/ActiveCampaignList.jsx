import CampaignQuery from '@queries/campaign';

const Root = ({ children }) => {
	const { data: activeCampaignList } = CampaignQuery.useActiveCampaignList({ suspense: true });
	return children({ activeCampaignList });
};

const ActiveCampaignList = { Root };

export default ActiveCampaignList;
