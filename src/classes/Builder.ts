import { Config } from './Config';
import { NativeLoader } from './NativeLoader';
import { NetAddress, PublicKey } from './Bindings';
import { Node } from './Node';
import { addressToString } from '../utils';

const DefaultServicesMutinynet = {
esploraServerUrl : 'https://mutinynet.ltbl.io/api',
rgsServerUrl : 'https://mutinynet.ltbl.io/snapshot',
lsps2SourceAddress : '44.219.111.31',
lsps2SourcePort : '39735',
lsps2SourcePublicKey :'0371d6fd7d75de2d0372d03ea00e8bacdacb50c27d0eaea0a76a0622eff1f5ef2b',
lsps2SourceToken : 'JZWN9YLW'
};
export class Builder extends NativeLoader {
  
  id: string = '';

  /**
   * Create builder class from [Config]
   * @requires config
   * @returns Promise<Builder>
   */
  async fromConfig(config: Config): Promise<Builder> {
    this.id = await this._ldk.fromConfig(config.id);
    return this;
  }

  //  async fromConfig(config: Config): Promise<Builder> {
  //   const builder = new Builder();
  //   builder.id = await builder._ldk.fromConfig(config.id);
  //   return builder;
  // }

  /**
   * Configures the [Node] instance to source its wallet entropy from a seed file on disk.
   *
   * If the given file does not exist a new random seed file will be generated and stored at the given location.
   * @requires seedPath
   * @returns {Promise<boolean>}
   */
  async setEntropySeedPath(seedPath: string): Promise<boolean> {
    return await this._ldk.setEntropySeedPath(this.id, seedPath);
  }

  /**
   * Configures the [Node] instance to source its wallet entropy from the given 64 seed bytes.
   *
   * **Note:** Panics if the length of the given `seedBytes` differs from 64.
   * @requires seedBytes
   * @returns {Promise<boolean>}
   */
  async setEntropySeedBytes(seedBytes: Array<number>): Promise<boolean> {
    return await this._ldk.setEntropySeedBytes(this.id, seedBytes);
  }

  /**
   * Set mnemoninc
   *
   * @requires mnemoninc
   * @param passphrase
   * @returns {Promise<boolean>}
   */
  async setEntropyBip39Mnemonic(mnemoninc: string, passphrase?: string): Promise<boolean> {
    return await this._ldk.setEntropyBip39Mnemonic(this.id, mnemoninc, passphrase);
  }

  /**
   * Configures the [Node] instance to source its chain data from the given Esplora server.
   * @requires esploraServerUrl
   * @returns {Promise<boolean>}
   */
  async setEsploraServer(esploraServerUrl: string): Promise<boolean> {
    return await this._ldk.setEsploraServer(this.id, esploraServerUrl);
  }

  /**
   * Configures the [Node] instance to source its gossip data from the Lightning peer-to-peer network.
   * @returns {Promise<boolean>}
   */
  async setGossipSourceP2p(): Promise<boolean> {
    return await this._ldk.setGossipSourceP2p(this.id);
  }

  /**
   * Configures the [Node] instance to source its gossip data from the given RapidGossipSync server.
   * @requires rgsServerUrl
   * @returns {Promise<boolean>}
   */
  async setGossipSourceRgs(rgsServerUrl: string): Promise<boolean> {
    return await this._ldk.setGossipSourceRgs(this.id, rgsServerUrl);
  }

  /**
   * Sets the used storage directory path.
   * @requires storageDirPath
   * @returns {Promise<boolean>}
   */
  async setStorageDirPath(storageDirPath: string): Promise<boolean> {
    return await this._ldk.setStorageDirPath(this.id, storageDirPath);
  }

  /**
   * Sets the Bitcoin network used.
   * @requires network
   * @returns {Promise<boolean>}
   */
  async setNetwork(network: string): Promise<boolean> {
    return await this._ldk.setNetwork(this.id, network);
  }

  /**
   * Sets the IP addresses and TCP port on which [Node] will listen for incoming network connections.
   * @requires listeningAddresses
   * @returns {Promise<boolean>}
   */
  async setListeningAddresses(listeningAddresses: Array<NetAddress>): Promise<boolean> {
    return await this._ldk.setListeningAddresses(
      this.id,
      listeningAddresses.map((listeningAddress) => addressToString(listeningAddress))
    );
  }

  async setLiquiditySourceLsps2(address: string, publicKey:string, token:string): Promise<boolean> {
    return await this._ldk.setLiquiditySourceLsps2(this.id, address, publicKey, token);
  }

//   async createMutinynetBuilder(config?: Config): Promise<Builder> {
//   const builder = config ? await Builder.fromConfig(config) : new Builder();

//   await builder.setNetwork('signet');
//   await builder.setEsploraServer(DefaultServicesMutinynet.esploraServerUrl);
//   await builder.setGossipSourceRgs(DefaultServicesMutinynet.rgsServerUrl);
//   await builder.setMutinityNetwork({
//     address: DefaultServicesMutinynet.lsps2SourceAddress,
//     port: DefaultServicesMutinynet.lsps2SourcePort,
//     publicKey: DefaultServicesMutinynet.lsps2SourcePublicKey,
//     token: DefaultServicesMutinynet.lsps2SourceToken,
//   });

//   return builder;
// }

  /**
   * Create node
   * @returns {Promise<Node>}
   */
  async build(): Promise<Node> {
    let id = await this._ldk.build(this.id);
    return new Node(id);
  }
}
