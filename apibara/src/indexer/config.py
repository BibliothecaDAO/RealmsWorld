class Config:
    def __init__(
        self, network=None, bridge=None, start_block=None
    ):
        self.network = network
        self.BRIDGE_CONTRACT = bridge
        if start_block:
            self.STARTING_BLOCK = int(start_block)
        else:
            self.STARTING_BLOCK = start_block