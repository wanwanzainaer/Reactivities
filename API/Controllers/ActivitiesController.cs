using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;



namespace API.Controllers
{
  public class ActivitiesController : BaseApiController
  {


    [HttpGet]
    public async Task<IActionResult> GetActivities()
    {
      return HandleResult(await Mediator.Send(new List.Query()));
    }


    [HttpGet("{id:Guid}")]
    public async Task<IActionResult> GetActivity(Guid id)
    {
      return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity([FromBody] Activity activity) {
        return HandleResult(await Mediator.Send(new Create.Command{Activity = activity}));
    }
    
    
    [HttpPut("{id:Guid}")]
    public async Task<IActionResult> EditActivity(Guid id,  Activity activity){
        activity.Id = id;
        return Ok(await Mediator.Send(new Edit.Command{Activity = activity}));
    }

    [HttpDelete("{id:Guid}")]
    public async Task<IActionResult> DeleteActivity(Guid id) {
      return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
    }

  }
}