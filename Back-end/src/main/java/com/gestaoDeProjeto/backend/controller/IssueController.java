package com.gestaoDeProjeto.backend.controller;

import com.gestaoDeProjeto.backend.modal.Issue;
import com.gestaoDeProjeto.backend.modal.IssueDTO;
import com.gestaoDeProjeto.backend.modal.User;
import com.gestaoDeProjeto.backend.requist.IssueRequest;
import com.gestaoDeProjeto.backend.response.MessageResponse;
import com.gestaoDeProjeto.backend.service.IssueService;
import com.gestaoDeProjeto.backend.service.UserService;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @Autowired
    private UserService userService;

    @GetMapping("/{issueId}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long issueId) throws Exception {
        return ResponseEntity.ok(issueService.getIssueById(issueId));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Issue>> getIssueByProjectId(@PathVariable Long projectId)
    throws Exception {
        return ResponseEntity.ok(issueService.getIssueByProjectId(projectId));
    }

	@PostMapping
	public ResponseEntity<IssueDTO> createIssue(@RequestBody IssueRequest issue,@RequestHeader("Authorization") String token) throws Exception{
		
		User tokenUser = userService.findUserProfileByJwt(token);
		User user = userService.findUserById(tokenUser.getId());
		
		Issue createdIssue = issueService.createIssue(issue, tokenUser);
		IssueDTO issueDTO = new IssueDTO();
		issueDTO.setId(createdIssue.getId());
		issueDTO.setTitle(createdIssue.getTitle());
		issueDTO.setDescription(createdIssue.getDescription());
		issueDTO.setStatus(createdIssue.getStatus());
		issueDTO.setDueDate(createdIssue.getDueDate());
		issueDTO.setPriority(createdIssue.getPriority());
		issueDTO.setAssignee(createdIssue.getAssignee());
		issueDTO.setProjectID(createdIssue.getProject().getId());
		issueDTO.setProject(createdIssue.getProject());;
		issueDTO.setTags(createdIssue.getTags());
        issueDTO.setCreatedAt(LocalDateTime.now());
		return ResponseEntity.ok(issueDTO);
	}
    
    @DeleteMapping("/{issueId}")
    public ResponseEntity<MessageResponse> deleteIssue(@PathVariable Long issueId,
                                                       @RequestHeader("Authorization") String token)
            throws Exception {
        User user = userService.findUserProfileByJwt(token);
        issueService.deleteIssue(issueId, user.getId());
        MessageResponse res = new  MessageResponse();
        res.setMessage("Issue deleted");
        return ResponseEntity.ok(res);
    }


    @PutMapping ("/{issueId}/assignee/{userId}")
    public ResponseEntity<Issue> addUserToIssue(@PathVariable Long issueId,
                                            @PathVariable Long userId)
            throws Exception {

        Issue issue = issueService.addUserToIssue(issueId, userId);

        return ResponseEntity.ok(issue);
    }

    @PutMapping("/{issueId}/status/{status}")
    public ResponseEntity<Issue>updateIssueStatus(
            @PathVariable String status,
            @PathVariable Long issueId) throws Exception {
        Issue issue = issueService.updateStatus(issueId, status);
        return ResponseEntity.ok(issue);
    }
    @GetMapping("/user")
    public ResponseEntity<List<Issue>> getIssuesForUser(@RequestHeader("Authorization") String token) throws Exception {
        User user = userService.findUserProfileByJwt(token);
        List<Issue> issues = issueService.getIssuesForUser(user);
        return ResponseEntity.ok(issues);
    }
}