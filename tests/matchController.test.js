jest.mock('../models/Match', () => ({
  find: jest.fn(),
  findById: jest.fn()
}));

const Match = require('../models/Match');

const {
  getAllMatches,
  getMatchById
} = require('../controllers/matchController');

const createMockResponse = () => {
  const res = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};

const expectedPopulation = [
  {
    path: 'tournament',
    select: 'name season'
  },
  {
    path: 'homeTeam',
    select: 'name city country'
  },
  {
    path: 'awayTeam',
    select: 'name city country'
  }
];

describe('Match GET controllers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllMatches returns all matches with status 200', async () => {
    const mockMatches = [
      {
        _id: '64b7f6c2e4b0a123456789ab',
        venue: 'Centenario Stadium',
        round: 'Group Stage - Round 1',
        status: 'scheduled'
      },
      {
        _id: '64b7f6c2e4b0a123456789ac',
        venue: 'Campeon del Siglo Stadium',
        round: 'Group Stage - Round 2',
        status: 'scheduled'
      }
    ];

    const populateMock = jest
      .fn()
      .mockResolvedValue(mockMatches);

    Match.find.mockReturnValue({
      populate: populateMock
    });

    const req = {};
    const res = createMockResponse();

    await getAllMatches(req, res);

    expect(Match.find).toHaveBeenCalledTimes(1);
    expect(populateMock).toHaveBeenCalledWith(expectedPopulation);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockMatches);
  });

  test('getMatchById returns one match with status 200', async () => {
    const validId = '64b7f6c2e4b0a123456789ab';

    const mockMatch = {
      _id: validId,
      venue: 'Centenario Stadium',
      round: 'Group Stage - Round 1',
      status: 'scheduled'
    };

    const populateMock = jest
      .fn()
      .mockResolvedValue(mockMatch);

    Match.findById.mockReturnValue({
      populate: populateMock
    });

    const req = {
      params: {
        id: validId
      }
    };

    const res = createMockResponse();

    await getMatchById(req, res);

    expect(Match.findById).toHaveBeenCalledWith(validId);
    expect(populateMock).toHaveBeenCalledWith(expectedPopulation);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockMatch);
  });
});