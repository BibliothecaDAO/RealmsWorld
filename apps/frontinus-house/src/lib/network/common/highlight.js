"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_QUERY = exports.VOTES_QUERY = exports.PROPOSALS_QUERY = exports.PROPOSAL_QUERY = exports.SPACES_QUERY = exports.SPACE_QUERY = void 0;
exports.joinHighlightSpace = joinHighlightSpace;
exports.joinHighlightProposal = joinHighlightProposal;
exports.joinHighlightUser = joinHighlightUser;
exports.mixinHighlightVotes = mixinHighlightVotes;
var graphql_tag_1 = require("graphql-tag");
var SPACE_FRAGMENT = (0, graphql_tag_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  fragment highlightSpaceFragment on SXSpace {\n    id\n    vote_count\n  }\n"], ["\n  fragment highlightSpaceFragment on SXSpace {\n    id\n    vote_count\n  }\n"])));
var PROPOSAL_FRAGMENT = (0, graphql_tag_1.default)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  fragment highlightProposalFragment on SXProposal {\n    id\n    scores_1\n    scores_2\n    scores_3\n    scores_total\n    vote_count\n  }\n"], ["\n  fragment highlightProposalFragment on SXProposal {\n    id\n    scores_1\n    scores_2\n    scores_3\n    scores_total\n    vote_count\n  }\n"])));
exports.SPACE_QUERY = (0, graphql_tag_1.default)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  query ($id: String!) {\n    sxspace(id: $id) {\n      ...highlightSpaceFragment\n    }\n  }\n  ", "\n"], ["\n  query ($id: String!) {\n    sxspace(id: $id) {\n      ...highlightSpaceFragment\n    }\n  }\n  ", "\n"])), SPACE_FRAGMENT);
exports.SPACES_QUERY = (0, graphql_tag_1.default)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  query ($ids: [String!]!) {\n    sxspaces(where: { id_in: $ids }) {\n      ...highlightSpaceFragment\n    }\n  }\n  ", "\n"], ["\n  query ($ids: [String!]!) {\n    sxspaces(where: { id_in: $ids }) {\n      ...highlightSpaceFragment\n    }\n  }\n  ", "\n"])), SPACE_FRAGMENT);
exports.PROPOSAL_QUERY = (0, graphql_tag_1.default)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  query ($id: String!) {\n    sxproposal(id: $id) {\n      ...highlightProposalFragment\n    }\n  }\n  ", "\n"], ["\n  query ($id: String!) {\n    sxproposal(id: $id) {\n      ...highlightProposalFragment\n    }\n  }\n  ", "\n"])), PROPOSAL_FRAGMENT);
exports.PROPOSALS_QUERY = (0, graphql_tag_1.default)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  query ($ids: [String!]!) {\n    sxproposals(where: { id_in: $ids }) {\n      ...highlightProposalFragment\n    }\n  }\n  ", "\n"], ["\n  query ($ids: [String!]!) {\n    sxproposals(where: { id_in: $ids }) {\n      ...highlightProposalFragment\n    }\n  }\n  ", "\n"])), PROPOSAL_FRAGMENT);
exports.VOTES_QUERY = (0, graphql_tag_1.default)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  query ($space: String!, $proposal: Int!) {\n    votes(where: { space: $space, proposal: $proposal }) {\n      voter {\n        id\n      }\n      space {\n        id\n      }\n      proposal\n      choice\n      vp\n      created\n      tx\n    }\n  }\n"], ["\n  query ($space: String!, $proposal: Int!) {\n    votes(where: { space: $space, proposal: $proposal }) {\n      voter {\n        id\n      }\n      space {\n        id\n      }\n      proposal\n      choice\n      vp\n      created\n      tx\n    }\n  }\n"])));
exports.USER_QUERY = (0, graphql_tag_1.default)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  query ($id: String!) {\n    sxuser(id: $id) {\n      id\n      proposal_count\n      vote_count\n      created\n    }\n  }\n"], ["\n  query ($id: String!) {\n    sxuser(id: $id) {\n      id\n      proposal_count\n      vote_count\n      created\n    }\n  }\n"])));
function joinHighlightSpace(space, highlightSpace) {
    if (!highlightSpace)
        return space;
    return __assign(__assign({}, space), { vote_count: space.vote_count + highlightSpace.vote_count });
}
function joinHighlightProposal(proposal, highlightProposal) {
    if (!highlightProposal)
        return proposal;
    return __assign(__assign({}, proposal), { scores_1: Number(BigInt(proposal.scores_1) + BigInt(highlightProposal.scores_1)), scores_2: Number(BigInt(proposal.scores_2) + BigInt(highlightProposal.scores_2)), scores_3: Number(BigInt(proposal.scores_3) + BigInt(highlightProposal.scores_3)), scores_total: Number(BigInt(proposal.scores_total) + BigInt(highlightProposal.scores_total)), vote_count: proposal.vote_count + highlightProposal.vote_count });
}
function joinHighlightUser(user, highlightUser) {
    if (!highlightUser)
        return user;
    return __assign(__assign(__assign({}, user), highlightUser), { vote_count: user
            ? user.vote_count + highlightUser.vote_count
            : highlightUser.vote_count });
}
function mixinHighlightVotes(votes, highlightVotes, filter, orderBy, orderDirection, limit) {
    var _a;
    if (!highlightVotes.length)
        return { result: votes, remaining: [] };
    var filteredHighlightVotes = highlightVotes.filter(function (vote) {
        if (filter === "for")
            return vote.choice === 1;
        if (filter === "against")
            return vote.choice === 2;
        if (filter === "abstain")
            return vote.choice === 3;
        return true;
    });
    var hasMore = votes.length === limit;
    var thresholdValue = votes.length > 0 ? (_a = votes[votes.length - 1]) === null || _a === void 0 ? void 0 : _a[orderBy] : null;
    var mixins = !hasMore || thresholdValue === null
        ? { added: filteredHighlightVotes, remaining: [] }
        : filteredHighlightVotes.reduce(function (res, vote) {
            var valid = orderDirection === "desc"
                ? vote[orderBy] >= (thresholdValue !== null && thresholdValue !== void 0 ? thresholdValue : 0)
                : vote[orderBy] < (thresholdValue !== null && thresholdValue !== void 0 ? thresholdValue : 0);
            if (valid)
                res.added.push(vote);
            else
                res.remaining.push(vote);
            return res;
        }, { added: [], remaining: [] });
    var result = __spreadArray(__spreadArray([], votes, true), mixins.added, true).sort(function (a, b) {
        return orderDirection === "desc"
            ? b[orderBy] - a[orderBy]
            : a[orderBy] - b[orderBy];
    });
    return { result: result, remaining: mixins.remaining };
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
