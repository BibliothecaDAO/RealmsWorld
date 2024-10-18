"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Proposals;
var react_1 = require("react");
var layout_1 = require("@/components/layout");
var network_1 = require("@/lib/network");
var utils_1 = require("@/lib/utils");
var react_router_dom_1 = require("react-router-dom");
function Proposals() {
    var _this = this;
    var _a = (0, react_1.useState)(), proposals = _a[0], setProposals = _a[1];
    console.log("got here");
    (0, react_1.useEffect)(function () {
        var fetchProposals = function () { return __awaiter(_this, void 0, void 0, function () {
            var proposalsData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, network_1.getNetwork)("sn-sep").api.loadProposals(["0x0011c8d7674bb371708933d29c5e2a4ea31a6535809950b863851373f1afc112"], {
                            limit: 20,
                        }, 0, "any")];
                    case 1:
                        proposalsData = _a.sent();
                        setProposals(proposalsData);
                        return [2 /*return*/];
                }
            });
        }); };
        fetchProposals();
    }, []);
    console.log(proposals);
    return (<layout_1.Layout>
      <layout_1.LayoutBody className="flex flex-col" fixedHeight>
        <div className="px-4">
          <h1 className="text-lg uppercase text-muted">Proposals</h1>
        </div>
        <hr />
        {proposals
            ? proposals.map(function (proposal) {
                var _a;
                return (<div>
                <react_router_dom_1.Link to={"/proposals/".concat(proposal.proposal_id)}>
                  <div className="mx-4 flex border-b py-[14px]">
                    <div className="mr-4 w-0 flex-auto">
                      <div className="flex space-x-2">
                        <div className="my-1 items-center leading-6 md:flex md:min-w-0">
                          <h4 className="my-0">
                            {(_a = proposal.title) !== null && _a !== void 0 ? _a : "Proposal #".concat(proposal.id)}
                          </h4>
                        </div>
                      </div>
                      <div className="mr-4 inline">
                        {(0, utils_1.getProposalId)(proposal)} by{" "}
                        {proposal.author.name || (0, utils_1.shorten)(proposal.author.id)}
                      </div>
                      <span>{proposal.vote_count} votes</span>
                    </div>
                  </div>
                </react_router_dom_1.Link>
              </div>);
            })
            : "Loading"}
      </layout_1.LayoutBody>
    </layout_1.Layout>);
}
