import { text } from "stream/consumers";
import { Markdown } from "@/components/Markdown";
import { _rt, getProposalId, shortenAddress } from "@/lib/utils";
import type { Proposal } from "@/types";
import { Link, useLocation } from "react-router-dom";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
} from "@realms-world/ui";

export default function Overview({ proposal }: { proposal: Proposal }) {
  const location = useLocation();

  const currentUrl = `${window.location.origin}/#${location.pathname}`;

  const shareMsg = encodeURIComponent(
    `${proposal.space.name}: ${proposal.title} ${currentUrl}`,
  );
  return (
    <div>
      <h1 className="mb-3 text-[36px] leading-10">
        {proposal.title || `Proposal #${proposal.proposal_id}`}
        <span className="text-skin-text">{getProposalId(proposal)}</span>
      </h1>

      {/*<ProposalStatus :state="proposal.state" className="top-[7.5px]" />*/}

      <div className="mb-3 flex items-center justify-between">
        <Link
          to={`user/${proposal.author.id}`}
          className="flex items-center py-3"
        >
          {/*<Stamp :id="proposal.author.id" :size="32" className="mr-1" />*/}
          <div className="ml-2 flex flex-col gap-1 leading-4">
            {proposal.author.name || shortenAddress(proposal.author.id)}
            <span className="text-skin-text text-sm">
              In
              <Link
                to="{
                    name: 'space-overview',
                    params: { id: `${proposal.network}:${proposal.space.id}` }
                  }"
                className="text-skin-text"
              >
                {proposal.space.name}
              </Link>
              · {_rt(proposal.created)}
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          {/*<Tooltip
              v-if="
                offchainNetworks.includes(props.proposal.network) && props.proposal.body.length > 500
              "
              title="'AI summary'"
            >
              <Button
                className="!p-0 border-0 !h-[auto]"
                //disabled={aiSummaryState.loading}
                onClick={handleAiSummaryClick()}
              >
                <Loading v-if="aiSummaryState.loading" className="inline-block !w-[22px] !h-[22px]" />
                <IH-sparkles
                  v-else
                  className="inline-block w-[22px] h-[22px]"
                  className={aiSummaryOpen ? 'text-skin-link' : 'text-skin-text'}
                />
              </Button>
                </Tooltip>
            <Tooltip
              v-if="
                offchainNetworks.includes(props.proposal.network) &&
                props.proposal.body.length > 0 &&
                props.proposal.body.length < 4096
              "
              title="audioState === 'playing' ? 'Pause' : 'Listen'"
            >
              <Button
                className="!p-0 border-0 !h-[auto]"
                :disabled="aiSpeechState.loading"
                @click="handleAiSpeechClick"
              >
                <Loading v-if="aiSpeechState.loading" className="inline-block !w-[22px] !h-[22px]" />
                <IH-pause
                  v-else-if="audioState === 'playing'"
                  className="inline-block w-[22px] h-[22px] text-skin-link"
                />
                <IH-play v-else className="inline-block text-skin-text w-[22px] h-[22px]" />
              </Button>
                </Tooltip>*/}

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="!h-[auto] border-0 !p-0">
                {/*<IH-share className="text-skin-text inline-block h-[22px] w-[22px]" />*/}
                Share
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem v-slot="{ active }">
                <a
                  className={`flex items-center gap-2`}
                  //className="{ 'opacity-80': active }"
                  href="`https://twitter.com/intent/tweet/?text=${shareMsg}`"
                  target="_blank"
                >
                  {/*<IC-x />*/}
                  Share on X
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem v-slot="{ active }">
                <a
                  className="flex items-center gap-2"
                  //className="{ 'opacity-80': active }"
                  href="`https://hey.xyz/?hashtags=Snapshot&text=${shareMsg}`"
                  target="_blank"
                >
                  {/* <IC-lens />*/}
                  Share on Lens
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem v-slot="{ active }">
                <a
                  className="flex items-center gap-2"
                  //className="{ 'opacity-80': active }"
                  href={`https://warpcast.com/~/compose?text=${shareMsg}`}
                  target="_blank"
                >
                  {/*<IC-farcaster />*/}
                  Share on Farcaster
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/*<DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="!p-0 border-0 !h-[auto]">
                  <IH-dots-vertical className="text-skin-text inline-block w-[22px] h-[22px]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem v-if="editable" v-slot="{ active }">
                  <button
                    className="flex items-center gap-2"
                    :className="{ 'opacity-80': active }"
                    @click="handleEditClick"
                  >
                    <IS-pencil :width="16" />
                    Edit proposal
                  </button>
                </DropdownMenuItem>
                {cancellable &&(<DropdownMenuItem
                  disabled="cancelling"
                >)}
                  <button
                    className="flex items-center gap-2"
                    className="{ 'opacity-80': active, 'opacity-40': disabled }"
                    onClick={handleCancelClick()}
                  >
                    <IS-x-mark :width="16" />
                    Cancel proposal
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem v-if="proposalMetadataUrl" v-slot="{ active }">
                  <a
                    :href="proposalMetadataUrl"
                    target="_blank"
                    className="flex items-center gap-2"
                    :className="{ 'opacity-80': active }"
                  >
                    <IH-arrow-sm-right className="-rotate-45" :width="16" />
                    View metadata
                  </a>
                </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>*/}
        </div>
      </div>
      {/*<div v-if="aiSummaryOpen" className="mb-6">
          <h4 className="mb-2 eyebrow flex items-center">
            <IH-sparkles className="inline-block mr-2" />
            <span>AI summary</span>
          </h4>
          <div className="text-md text-skin-link mb-2">{ aiSummaryContent }</div>
          <div className="flex gap-2 items-center text-sm">
            <IH-exclamation />
            AI can be inaccurate or misleading.
          </div>
            </div>*/}
      {proposal.body && (
        <div className="px-4">
          <Markdown body={proposal.body} />
        </div>
      )}
      {/*<div v-if="discussion">
          <h4 className="mb-3 eyebrow flex items-center">
            <IH-chat-alt className="inline-block mr-2" />
            <span>Discussion</span>
          </h4>
          <a :href="discussion" target="_blank" className="block mb-5">
            <LinkPreview :url="discussion" :show-default="true" />
          </a>
        </div>
        <div v-if="proposal.execution && proposal.execution.length > 0">
          <h4 className="mb-3 eyebrow flex items-center">
            <IH-play className="inline-block mr-2" />
            <span>Execution</span>
          </h4>
          <div className="mb-4">
            <ProposalExecutionsList :txs="proposal.execution" />
          </div>
        </div>
        <div
          v-if="
            proposal.execution &&
            proposal.execution.length > 0 &&
            BigInt(proposal.scores_total) >= BigInt(proposal.quorum) &&
            BigInt(proposal.scores[0]) > BigInt(proposal.scores[1]) &&
            proposal.has_execution_window_opened
          "
        >
          <h4 className="mb-3 eyebrow flex items-center">
            <IH-play className="inline-block mr-2" />
            <span>Actions</span>
          </h4>
          <div className="mb-4">
            <ProposalExecutionActions :proposal="proposal" />
          </div>
        </div>
        <div>
          <a className="text-skin-text" onClick={modalOpenVotes = true}>
            { _n(proposal.vote_count) } { proposal.vote_count !== 1 ? 'votes' : 'vote' }
          </a>
          ·
          <a className="text-skin-text" @click="modalOpenTimeline = true" v-text="votingTime" />
          <template v-if="proposal.edited"> · (edited)</template>
        </div>*/}
    </div>
  );
}
