import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useParams,
} from 'react-router-dom';

import { useDao } from '../contexts/DaoContext';
import { useDaoMember } from '../contexts/DaoMemberContext';
import { useToken } from '../contexts/TokenContext';
import { useMetaData } from '../contexts/MetaDataContext';
import Members from '../pages/Members';
import Overview from '../pages/Overview';
import Proposals from '../pages/Proposals';
import Profile from '../pages/Profile';
import Proposal from '../pages/Proposal';
import NewProposal from '../pages/NewProposal';
import Settings from '../pages/Settings';
import Allies from '../pages/Allies';
import Boosts from '../pages/Boosts';
import ThemeBuilder from '../pages/ThemeBuilder';
import Layout from '../components/layout';
import Meta from '../pages/Meta';
import Notifications from '../pages/Notifications';
import DiscourseSettings from '../pages/DiscourseSettings';
import ProposalTypes from '../pages/ProposalTypes';
import MinionSafe from '../pages/MinionSafe';
import SuperfluidMinion from '../pages/SuperfluidMinion';
import Clone from '../pages/Clone';
import MintGate from '../pages/MintGate';
import Snapshot from '../pages/Snapshot';
import CcoContribution from '../pages/CcoContribution';
import CcoHelper from '../pages/CcoHelper';
import CcoAdmin from '../pages/CcoAdmin';
import Vaults from '../pages/Vaults';
import MinionVault from '../pages/MinionVault';
import MinionGallery from '../pages/MinionGallery';
import Treasury from '../pages/Treasury';

const DaoRouter = () => {
  const { path } = useRouteMatch();
  const { currentDaoTokens } = useToken();
  const {
    daoActivities,
    isCorrectNetwork,
    daoOverview,
    daoMembers,
    daoProposals,
    daoVaults,
  } = useDao();
  const { isMember, daoMember, delegate } = useDaoMember();

  const { daoid, daochain } = useParams();
  const { daoMetaData, customTerms, refetchMetaData } = useMetaData();
  const dao = {
    daoID: daoid,
    chainID: daochain,
    daoMetaData,
    daoMember,
    customTerms,
    daoProposals,
    daoVaults,
  };

  return (
    <Layout dao={dao}>
      <Switch>
        <Route exact path={`${path}/`}>
          <Overview
            activities={daoActivities}
            daoMember={daoMember}
            isMember={isMember}
            isCorrectNetwork={isCorrectNetwork}
            daoOverview={daoOverview}
            members={daoMembers}
            daoMetaData={daoMetaData}
            daoVaults={daoVaults}
          />
        </Route>
        <Route exact path={`${path}/proposals`}>
          <Proposals
            proposals={daoActivities?.proposals}
            overview={daoOverview}
            activities={daoActivities}
            customTerms={customTerms}
          />
        </Route>
        <Route exact path={`${path}/vaults`}>
          <Vaults
            currentDaoTokens={currentDaoTokens}
            overview={daoOverview}
            customTerms={customTerms}
            daoMember={daoMember}
            daoVaults={daoVaults}
          />
        </Route>
        <Route exact path={`${path}/vaults/treasury`}>
          <Treasury
            currentDaoTokens={currentDaoTokens}
            overview={daoOverview}
            customTerms={customTerms}
            daoMember={daoMember}
            daoVaults={daoVaults}
          />
        </Route>
        <Route exact path={`${path}/vaults/minion/:minion`}>
          <MinionVault
            currentDaoTokens={currentDaoTokens}
            overview={daoOverview}
            customTerms={customTerms}
            daoMember={daoMember}
            daoVaults={daoVaults}
            isMember={isMember}
          />
        </Route>
        <Route
          exact
          path={[`${path}/gallery/minion/:minion`, `${path}/gallery/`]}
        >
          <MinionGallery daoVaults={daoVaults} customTerms={customTerms} />
        </Route>
        <Route exact path={`${path}/members`}>
          <Members
            members={daoMembers}
            activities={daoActivities}
            overview={daoOverview}
            daoMember={daoMember}
            daoMembers={daoMembers}
            customTerms={customTerms}
            daoMetaData={daoMetaData}
          />
        </Route>
        <Route exact path={`${path}/settings/boosts`}>
          <Boosts
            daoOverview={daoOverview}
            daoMetaData={daoMetaData}
            customTerms={customTerms}
            daoMember={daoMember}
          />
        </Route>
        <Route exact path={`${path}/staking`}>
          <Redirect to='/' />
        </Route>
        <Route exact path={`${path}/settings/clone`}>
          <Clone daoMembers={daoMembers} daoOverview={daoOverview} />
        </Route>
        <Route exact path={`${path}/settings/notifications`}>
          <Notifications
            daoMetaData={daoMetaData}
            refetchMetaData={refetchMetaData}
          />
        </Route>
        <Route exact path={`${path}/settings/discourse`}>
          <DiscourseSettings
            daoMetaData={daoMetaData}
            refetchMetaData={refetchMetaData}
          />
        </Route>
        <Route exact path={`${path}/settings/theme`}>
          <ThemeBuilder refetchMetaData={refetchMetaData} />
        </Route>
        <Route exact path={`${path}/settings`}>
          <Settings
            overview={daoOverview}
            daoMember={daoMember}
            daoMetaData={daoMetaData}
            customTerms={customTerms}
          />
        </Route>
        <Route exact path={`${path}/settings/meta`}>
          <Meta
            daoMetaData={daoMetaData}
            isMember={isMember}
            refetchMetaData={refetchMetaData}
          />
        </Route>
        <Route exact path={`${path}/settings/proposals`}>
          <ProposalTypes
            daoMetaData={daoMetaData}
            refetchMetaData={refetchMetaData}
          />
        </Route>
        <Route
          exact
          path={`${path}/settings/superfluid-minion/:minion`} // path={`${path}/settings/superfluid-minion/:minion(\b0x[0-9a-f]{10,40}\b)`}
        >
          <SuperfluidMinion
            activities={daoActivities}
            overview={daoOverview}
            daoMember={daoMember}
            members={daoMembers}
          />
        </Route>
        <Route
          exact
          path={`${path}/settings/minion-safe`} // path={`${path}/settings/minion/:minion(\b0x[0-9a-f]{10,40}\b)`}
        >
          <MinionSafe
            daoOverview={daoOverview}
            daoMetaData={daoMetaData}
            members={daoMembers}
            currentDaoTokens={currentDaoTokens}
          />
        </Route>
        <Route exact path={`${path}/allies`}>
          <Allies
            daoOverview={daoOverview}
            daoMetaData={daoMetaData}
            proposals={daoActivities?.proposals}
            isMember={isMember}
            daoMembers={daoMembers}
          />
        </Route>
        <Route exact path={`${path}/proposals/new/:proposalType`}>
          <NewProposal
            customTerms={customTerms}
            daoMetaData={daoMetaData}
            daoOverview={daoOverview}
          />
        </Route>
        <Route exact path={`${path}/proposals/new`}>
          <NewProposal
            customTerms={customTerms}
            daoMetaData={daoMetaData}
            daoOverview={daoOverview}
          />
        </Route>
        <Route exact path={`${path}/proposals/:propid`}>
          <Proposal
            overview={daoOverview}
            daoMember={daoMember}
            activities={daoActivities}
            customTerms={customTerms}
            daoProposals={daoProposals}
            delegate={delegate}
          />
        </Route>
        <Route exact path={`${path}/profile/:userid`}>
          <Profile
            members={daoMembers}
            overview={daoOverview}
            daoTokens={currentDaoTokens}
            activities={daoActivities}
            daoMember={daoMember}
          />
        </Route>
        <Route exact path={`${path}/uberhaus/clone`}>
          <Clone daoMembers={daoMembers} daoOverview={daoOverview} isUberHaus />
        </Route>
        <Route exact path={`${path}/uberhaus/proposals/new`}>
          <NewProposal
            customTerms={customTerms}
            daoMetaData={daoMetaData}
            daoOverview={daoOverview}
          />
        </Route>
        <Route exact path={`${path}/cco`}>
          <CcoContribution
            daoMetaData={daoMetaData}
            currentDaoTokens={currentDaoTokens}
            daoProposals={daoProposals}
          />
        </Route>
        <Route exact path={`${path}/cco/watcher`}>
          <CcoHelper
            daoMetaData={daoMetaData}
            currentDaoTokens={currentDaoTokens}
            daoProposals={daoProposals}
          />
        </Route>
        <Route exact path={`${path}/cco/admin/`}>
          <CcoAdmin
            daoMetaData={daoMetaData}
            isCorrectNetwork={isCorrectNetwork}
          />
        </Route>
        <Route exact path={`${path}/boost/mintgate`}>
          <MintGate daoMetaData={daoMetaData} />
        </Route>
        <Route exact path={`${path}/boost/snapshot`}>
          <Snapshot isMember={isMember} daoMetaData={daoMetaData} />
        </Route>
      </Switch>
    </Layout>
  );
};

export default DaoRouter;
