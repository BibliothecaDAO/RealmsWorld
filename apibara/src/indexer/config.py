class Config:
    def __init__(
        self, network=None, bridge=None, beasts721=None, start_block=None
    ):
        self.network = network
        self.BRIDGE_CONTRACT = bridge
        self.BEASTS_CONTRACT = beasts721
        if start_block:
            self.STARTING_BLOCK = int(start_block)
        else:
            self.STARTING_BLOCK = start_block
