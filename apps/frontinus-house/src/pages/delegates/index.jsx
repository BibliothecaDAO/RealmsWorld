"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Delegates;
var react_1 = require("react");
var layout_1 = require("@/components/layout");
var space_provider_1 = require("@/components/space-provider");
var space_delegates_1 = require("./space-delegates");
function Delegates() {
    var space = (0, space_provider_1.useSpace)().space;
    var _a = (0, react_1.useState)(0), activeDelegationId = _a[0], setActiveDelegationId = _a[1];
    var delegateData = space === null || space === void 0 ? void 0 : space.delegations[activeDelegationId];
    return (<layout_1.Layout>
      <layout_1.LayoutBody className="flex flex-col" fixedHeight>
        <div className="">
          <h1 className="border-b px-4 font-sans">Delegates</h1>
        </div>
        {delegateData && <space_delegates_1.SpaceDelegates delegation={delegateData}/>}
      </layout_1.LayoutBody>
    </layout_1.Layout>);
}
