"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceDelegates = void 0;
var react_1 = require("react");
var use_delegates_1 = require("@/hooks/use-delegates");
var utils_1 = require("@/lib/utils");
var SpaceDelegates = function (_a) {
    var delegation = _a.delegation;
    var _b = (0, use_delegates_1.useDelegates)(delegation.apiUrl), loading = _b.loading, loadingMore = _b.loadingMore, loaded = _b.loaded, failed = _b.failed, hasMore = _b.hasMore, delegates = _b.delegates, fetch = _b.fetch, fetchMore = _b.fetchMore, reset = _b.reset;
    (0, react_1.useEffect)(function () {
        fetch();
    }, []);
    return (<table className="w-full table-fixed text-left">
      <colgroup>
        <col className="w-auto"/>
        <col className="w-auto md:w-[120px]"/>
        <col className="w-0 md:w-[240px]"/>
      </colgroup>
      <thead className="bg-skin-bg sticky z-40 after:absolute after:w-full after:border-b">
        <tr>
          <th className="pl-4 font-medium">
            <span className="relative bottom-[1px]">Delegatee</span>
          </th>
          <th className="hidden md:table-cell">
            <button className="hover:text-skin-link relative bottom-[1px] flex w-full min-w-0 items-center justify-end font-medium">
              <span>Delegators</span>
              {/*} <IH-arrow-sm-down
              v-if="sortBy === 'tokenHoldersRepresentedAmount-desc'"
              className="ml-1"
            />
            <IH-arrow-sm-up
              v-else-if="sortBy === 'tokenHoldersRepresentedAmount-asc'"
              className="ml-1"
/>*/}
            </button>
          </th>
          <th>
            <button className="hover:text-skin-link relative bottom-[1px] flex w-full min-w-0 items-center justify-end pr-4 font-medium">
              <span className="truncate">Voting power</span>
              {/*} <IH-arrow-sm-down v-if="sortBy === 'delegatedVotes-desc'" className="ml-1" />
            <IH-arrow-sm-up v-else-if="sortBy === 'delegatedVotes-asc'" className="ml-1" />*/}
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {delegates.map(function (delegate, i) {
            return (<tr key={i} className="relative border-b">
              <td className="flex items-center py-3 pl-4 text-left">
                {/* <UiStamp :id="delegate.id" :size="32" className="mr-3" />*/}
                <div className="overflow-hidden">
                  <a 
            //href="currentNetwork.helpers.getExplorerUrl(delegate.id, 'address')"
            target="_blank">
                    <div className="leading-[22px]">
                      <h4 className="text-skin-link mb-0 truncate">
                        {delegate.name || (0, utils_1.shorten)(delegate.id)}
                      </h4>
                      <div className="text-skin-text truncate text-[17px]">
                        {(0, utils_1.shorten)(delegate.id)}
                      </div>
                    </div>
                  </a>
                </div>
              </td>
              <td className="hidden text-right align-middle md:table-cell">
                <h4 className="text-skin-link mb-0">
                  {delegate.tokenHoldersRepresentedAmount}
                </h4>
                <div className="text-[17px]">
                  {delegate.delegatorsPercentage.toFixed(3)}%
                </div>
              </td>
              <td className="pr-4 text-right align-middle">
                <h4 className="text-skin-link mb-0">
                  {parseInt(delegate.delegatedVotes)}
                </h4>
                <div className="text-[17px]">
                  {delegate.votesPercentage.toFixed(3)}%
                </div>
              </td>
            </tr>);
        })}
      </tbody>
    </table>);
};
exports.SpaceDelegates = SpaceDelegates;
