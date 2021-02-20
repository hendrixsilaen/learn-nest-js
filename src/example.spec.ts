class FriendList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.anounceFriendship(name);
  }

  anounceFriendship(name) {
    global.console.log(`${name} is now a friend!`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);

    if (idx === -1) {
      throw new Error('Friend not found!');
    }

    this.friends.splice(idx, 1);
  }
}

describe('FriendList', () => {
  let friendList;

  beforeEach(() => {
    friendList = new FriendList();
  });

  it('initialize friend list', () => {
    expect(friendList.friends.length).toEqual(0);
  });

  it('adds a friend to friend list', () => {
    friendList.addFriend('hendrix');
    expect(friendList.friends.length).toEqual(1);
  });

  it('anounces friendship', () => {
    friendList.anounceFriendship = jest.fn();
    expect(friendList.anounceFriendship).not.toHaveBeenCalled();
    friendList.addFriend('hendrix');
    expect(friendList.anounceFriendship).toHaveBeenCalledWith('hendrix');
  });

  describe('removeFriend', () => {
    it('removes a friend from the list', () => {
      friendList.addFriend('hendrix');
      expect(friendList.friends[0]).toEqual('hendrix');
      friendList.removeFriend('hendrix');
      expect(friendList.friends[0]).toBeUndefined();
    });

    it('throws an error as friend does not exist', () => {
      expect(() =>
        friendList.removeFriend('hendrix').toThrow(Error('Friend not found!')),
      );
    });
  });
});
