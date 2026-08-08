jest.mock('../models/Player', () => ({
  find: jest.fn(),
  findById: jest.fn()
}));

const Player = require('../models/Player');

const {
  getAllPlayers,
  getPlayerById
} = require('../controllers/playerController');

const createMockResponse = () => {
  const res = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};

describe('Player GET controllers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllPlayers returns all players with status 200', async () => {
    const mockPlayers = [
      {
        _id: '64b7f6c2e4b0a123456789ab',
        firstName: 'Federico',
        lastName: 'Valverde',
        position: 'midfielder'
      },
      {
        _id: '64b7f6c2e4b0a123456789ac',
        firstName: 'Luis',
        lastName: 'Suarez',
        position: 'forward'
      }
    ];

    const populateMock = jest
      .fn()
      .mockResolvedValue(mockPlayers);

    Player.find.mockReturnValue({
      populate: populateMock
    });

    const req = {};
    const res = createMockResponse();

    await getAllPlayers(req, res);

    expect(Player.find).toHaveBeenCalledTimes(1);

    expect(populateMock).toHaveBeenCalledWith(
      'team',
      'name city country'
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPlayers);
  });

  test('getPlayerById returns one player with status 200', async () => {
    const validId = '64b7f6c2e4b0a123456789ab';

    const mockPlayer = {
      _id: validId,
      firstName: 'Federico',
      lastName: 'Valverde',
      position: 'midfielder'
    };

    const populateMock = jest
      .fn()
      .mockResolvedValue(mockPlayer);

    Player.findById.mockReturnValue({
      populate: populateMock
    });

    const req = {
      params: {
        id: validId
      }
    };

    const res = createMockResponse();

    await getPlayerById(req, res);

    expect(Player.findById).toHaveBeenCalledWith(validId);

    expect(populateMock).toHaveBeenCalledWith(
      'team',
      'name city country'
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPlayer);
  });
});