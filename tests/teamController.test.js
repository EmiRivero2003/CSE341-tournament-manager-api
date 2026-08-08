jest.mock('../models/Team', () => ({
  find: jest.fn(),
  findById: jest.fn()
}));

const Team = require('../models/Team');

const {
  getAllTeams,
  getTeamById
} = require('../controllers/teamController');

const createMockResponse = () => {
  const res = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};

describe('Team GET controllers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllTeams returns all teams with status 200', async () => {
    const mockTeams = [
      {
        _id: '64b7f6c2e4b0a123456789ab',
        name: 'Montevideo Lions',
        country: 'Uruguay'
      },
      {
        _id: '64b7f6c2e4b0a123456789ac',
        name: 'Punta del Este Sharks',
        country: 'Uruguay'
      }
    ];

    Team.find.mockResolvedValue(mockTeams);

    const req = {};
    const res = createMockResponse();

    await getAllTeams(req, res);

    expect(Team.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTeams);
  });

  test('getTeamById returns one team with status 200', async () => {
    const validId = '64b7f6c2e4b0a123456789ab';

    const mockTeam = {
      _id: validId,
      name: 'Montevideo Lions',
      country: 'Uruguay'
    };

    Team.findById.mockResolvedValue(mockTeam);

    const req = {
      params: {
        id: validId
      }
    };

    const res = createMockResponse();

    await getTeamById(req, res);

    expect(Team.findById).toHaveBeenCalledWith(validId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTeam);
  });
});