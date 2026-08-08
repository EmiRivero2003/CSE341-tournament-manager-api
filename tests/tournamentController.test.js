jest.mock('../models/Tournament', () => ({
  find: jest.fn(),
  findById: jest.fn()
}));

const Tournament = require('../models/Tournament');

const {
  getAllTournaments,
  getTournamentById
} = require('../controllers/tournamentController');

const createMockResponse = () => {
  const res = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};

describe('Tournament GET controllers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllTournaments returns all tournaments with status 200', async () => {
    const mockTournaments = [
      {
        _id: '64b7f6c2e4b0a123456789ab',
        name: 'Uruguay Championship'
      },
      {
        _id: '64b7f6c2e4b0a123456789ac',
        name: 'South American Cup'
      }
    ];

    const populateMock = jest
      .fn()
      .mockResolvedValue(mockTournaments);

    Tournament.find.mockReturnValue({
      populate: populateMock
    });

    const req = {};
    const res = createMockResponse();

    await getAllTournaments(req, res);

    expect(Tournament.find).toHaveBeenCalledTimes(1);

    expect(populateMock).toHaveBeenCalledWith(
      'participatingTeams',
      'name country'
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTournaments);
  });

  test('getTournamentById returns one tournament with status 200', async () => {
    const validId = '64b7f6c2e4b0a123456789ab';

    const mockTournament = {
      _id: validId,
      name: 'Uruguay Championship'
    };

    const populateMock = jest
      .fn()
      .mockResolvedValue(mockTournament);

    Tournament.findById.mockReturnValue({
      populate: populateMock
    });

    const req = {
      params: {
        id: validId
      }
    };

    const res = createMockResponse();

    await getTournamentById(req, res);

    expect(Tournament.findById).toHaveBeenCalledWith(validId);

    expect(populateMock).toHaveBeenCalledWith(
      'participatingTeams',
      'name country'
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTournament);
  });
});