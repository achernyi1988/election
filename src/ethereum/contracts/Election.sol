pragma solidity ^0.4.25;

contract IElection{
    function vote(string  _contender, string _electorate) external ;
    function registerContender(string  _fullName, string  _description) external;
    function getNoOfVoted(string  _fullName) external view returns (uint256);
    function getWinner() external view returns (string memory, string memory, uint256);
}

contract Election is IElection{

    address public admin;

    struct ContenderData{
        string fullName;
        string description;
        uint256 voteCounter;
    }

    ContenderData [] public contender;
    //  mapping(string => ContenderData) contender;
    mapping(string => uint256) contenderId;
    uint256 public currentContenderID;
    mapping(string => bool) contenderRegistered;
    mapping(string => bool) electorateVoted;

    mapping(string => bool) votersMap;
    string [] public votersArray;
    constructor()public {
        admin = msg.sender;

        votersArray.push("0x3_Diana");
        votersArray.push("0x4_Tom");

        addContender("Alex", "White" );
        addContender("Lena", "Red" );
        addContender("Diana Chernya", "Green" );
    }

    string ipfsHash;


    event OnIPFSHash(string hash);
    event OnVote(string contender, string electorate);

    function getNumberOfVoter() public view returns (uint){
        return votersArray.length;
    }
    function getNumberOfContender() public view returns (uint){
        return contender.length;
    }


    function setIPFS(string hash)  public onlyAdmin {
        ipfsHash = hash;
        emit OnIPFSHash (ipfsHash);
    }

    function getIPFS()  public view returns (string){
        return ipfsHash;
    }

    function registerContender(string  _fullName, string  _description) external onlyAdmin{
        addContender(_fullName, _description);
    }

    function addContender(string memory _fullName, string memory _description) private {
        require(contenderRegistered[_fullName] == false, "a contender already added ");

        contenderRegistered[_fullName] = true;

        contenderId[_fullName] = ++currentContenderID;

        contender.push(ContenderData({fullName:_fullName, description: _description, voteCounter:0}));

    }

    function vote(string  _contender, string _electorate ) external  NotContender(_contender) {

        //voters[msg.sender] = true;

        ContenderData storage voted = contender[getContenderIndex(_contender)];

        voted.voteCounter++;

        electorateVoted[_electorate] = true;

        votersArray.push(_electorate);

        emit OnVote(_contender, _electorate);
    }

    function getNoOfVoted(string  _fullName) external view NotContender(_fullName)  returns (uint256){
        return contender[getContenderIndex(_fullName)].voteCounter;
    }


    function getWinner() external view returns (string memory,string memory, uint256){
        require(0 < contender.length, "0 < contender.length");
        uint256 max = 0;
        ContenderData memory winner = contender[0];
        for(uint256 i = 0; i < contender.length; i++){
            if(contender[i].voteCounter > max){
                max = contender[i].voteCounter;
                winner = contender[i];
            }
        }
        return(winner.fullName, winner.description, winner.voteCounter);
    }

    function getContenderIndex(string memory _fullName) private view returns(uint256){
        require(contenderId[_fullName]  > 0, "not valid contender ID");
        return contenderId[_fullName] - 1;
    }

    modifier notAdmin(){
        require(msg.sender != admin, "admin cannot vote");
        _;
    }

    modifier onlyAdmin(){
        require(msg.sender == admin, "only admin");
        _;
    }

    modifier NotContender(string memory _fullName){
        require(contenderRegistered[_fullName], "a contender is not available ");
        _;
    }
}